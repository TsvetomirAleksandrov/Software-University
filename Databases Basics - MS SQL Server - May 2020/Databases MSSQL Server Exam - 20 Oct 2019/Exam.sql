--1 DDL
CREATE DATABASE Service

CREATE TABLE Users
(
[Id] INT PRIMARY KEY IDENTITY,
[Username] VARCHAR(30) NOT NULL,
[Password] VARCHAR(50) NOT NULL,
[Name] VARCHAR(50),
[Birthdate] DATETIME,
[Age] INT CHECK(Age BETWEEN 14 AND 110),
[Email] VARCHAR(50) NOT NULL
)

CREATE TABLE Departments
(
[Id] INT PRIMARY KEY IDENTITY,
[Name] VARCHAR(50) NOT NULL
)

CREATE TABLE Employees
(
[Id] INT PRIMARY KEY IDENTITY,
[FirstName] VARCHAR(25),
[LastName] VARCHAR(25),
[Birthdate] DATETIME,
[Age] INT CHECK(Age BETWEEN 18 AND 110),
[DepartmentId] INT FOREIGN KEY REFERENCES Departments(Id)
)

CREATE TABLE Categories 
(
[Id] INT PRIMARY KEY IDENTITY,
[Name] VARCHAR(50) NOT NULL,
[DepartmentId] INT FOREIGN KEY REFERENCES Departments(Id) NOT NULL
)

CREATE TABLE [Status]
(
[Id] INT PRIMARY KEY IDENTITY,
[Label] VARCHAR(30) NOT NULL
)

CREATE TABLE Reports
(
[Id] INT PRIMARY KEY IDENTITY,
[CategoryId] INT FOREIGN KEY REFERENCES Categories(Id) NOT NULL,
[StatusId] INT FOREIGN KEY REFERENCES [Status](Id) NOT NULL,
[OpenDate] DATETIME NOT NULL,
[CloseDate] DATETIME,
[Description] VARCHAR(200) NOT NULL,
[UserId] INT FOREIGN KEY REFERENCES Users(Id) NOT NULL,
[EmployeeId] INT FOREIGN KEY REFERENCES Employees(Id)
)





--2
INSERT INTO Employees
([FirstName], [LastName], [Birthdate], [DepartmentId])
VALUES
('Marlo', 'O''Malley', '1958-9-21', 1),
('Niki', 'Stanaghan', '1969-11-26',	4),
('Ayrton', 'Senna', '1960-03-21', 9),
('Ronnie', 'Peterson', '1944-02-14', 9),
('Giovanna', 'Amati', '1959-07-20',	5)


INSERT INTO Reports
([CategoryId], [StatusId], [OpenDate], [CloseDate], [Description], [UserId], [EmployeeId])
VALUES
(1,	1,	'2017-04-13', ' ', 'Stuck Road on Str.133',6, 2),
(6, 3,	'2015-09-05', '2015-12-06',	'Charity trail running', 3,	5),
(14, 2,	'2015-09-07', ' ', 'Falling bricks on Str.58', 5, 2),
(4,	3,	'2017-07-03', '2017-07-06',	'Cut off streetlight on Str.11', 1, 1)


--3
UPDATE Reports
SET CloseDate = GETDATE()
WHERE CloseDate IS NULL


--4
DELETE 
FROM Reports
WHERE StatusId = 4


--5
SELECT 
[Description], 
FORMAT(r.OpenDate, 'dd-MM-yyyy') AS OpenDate
FROM Reports r
WHERE EmployeeId IS NULL
ORDER BY CONVERT(datetime, r.OpenDate), [Description] 


--6
SELECT r.[Description], c.Name AS [CategoryName]
FROM Reports r
JOIN Categories c
ON c.Id = r.CategoryId
ORDER BY r.[Description]


--7
SELECT TOP(5)
c.[Name], COUNT(CategoryId) AS [ReportsNumber]
FROM Categories c
JOIN Reports r
ON r.CategoryId = c.Id
GROUP BY c.[Name], r.CategoryId
ORDER BY [ReportsNumber] DESC, c.[Name]


--8
SELECT Username, c.[Name] AS [CategoryName]
FROM Reports r
JOIN Users u
ON u.Id = r.UserId
JOIN Categories c
ON c.Id = r.CategoryId
WHERE DAY(r.OpenDate) = DAY(u.Birthdate)
ORDER BY u.Username, [CategoryName]


--9
SELECT CONCAT(e.FirstName,' ',e.LastName) AS [FullName], COUNT(u.Username) AS [UsersCount]
FROM Employees e
LEFT JOIN Reports r
ON r.EmployeeId = e.Id
LEFT JOIN Users u 
ON r.UserId = u.Id 
GROUP BY CONCAT(e.FirstName,' ',e.LastName)
ORDER BY [UsersCount] DESC, [FullName] ASC


--10 Mazalo
SELECT CONCAT(e.FirstName, ' ', e.LastName) AS [Employee],
       d.[Name] AS [Department],
	   c.[Name] AS [Category],
	   r.[Description] AS [Description],
	   CONVERT(varchar(10), r.OpenDate, 104) AS OpenDate,
	   s.[Label] AS [Status],
	   u.[Name] AS [User]
	   
FROM Employees e
JOIN Departments d
ON d.Id = e.DepartmentId
JOIN Reports r
ON r.EmployeeId = e.Id
JOIN Categories c
ON c.Id = r.CategoryId
JOIN Status s
ON s.Id = r.StatusId
JOIN Users u
ON u.Id = r.UserId
ORDER BY e.FirstName DESC, e.LastName DESC, Department ASC, Category ASC, [Description] ASC, OpenDate ASC, [Status] ASC, [User] ASC


--11
CREATE OR ALTER FUNCTION udf_HoursToComplete(@StartDate DATETIME, @EndDate DATETIME)
RETURNS INT
AS
 BEGIN

 DECLARE @totalHours INT;
  IF(@StartDate IS NULL OR @EndDate IS NULL)
  BEGIN
   RETURN 0
  END
SET @totalHours = DATEDIFF(hh, @StartDate, @EndDate)
RETURN @totalHours;
END


SELECT dbo.udf_HoursToComplete(OpenDate, CloseDate) AS TotalHours
   FROM Reports


--12 Mazalo
CREATE OR ALTER PROC usp_AssignEmployeeToReport(@EmployeeId INT, @ReportId INT)
AS
BEGIN
 
DECLARE @employeeDepCheck INT = 
(SELECT e.DepartmentId
FROM Employees e WHERE e.Id = @EmployeeId)

DECLARE @reportDepCheck INT =
(SELECT c.DepartmentId
FROM Reports r
JOIN Categories c
ON c.Id = r.CategoryId
WHERE r.Id = @ReportId)

IF(@employeeDepCheck != @reportDepCheck)
BEGIN
RAISERROR('Employee doesn''t belong to the appropriate department!', 16, 1)
RETURN 
END

ELSE
BEGIN
UPDATE Employees 
END

END




EXEC usp_AssignEmployeeToReport 30, 1

EXEC usp_AssignEmployeeToReport 17, 2
