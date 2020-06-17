--1 DDL
CREATE TABLE Planes
(
[Id] INT PRIMARY KEY IDENTITY,
[Name] NVARCHAR(30) NOT NULL,
[Seats] INT NOT NULL,
[Range] INT NOT NULL
)


CREATE TABLE Flights
(
[Id] INT PRIMARY KEY IDENTITY,
[DepartureTime] DATETIME,
[ArrivalTime] DATETIME,
[Origin] NVARCHAR(50) NOT NULL,
[Destination] NVARCHAR(50) NOT NULL,
[PlaneId] INT FOREIGN KEY REFERENCES Planes(Id) NOT NULL
)

CREATE TABLE Passengers
(
[Id] INT PRIMARY KEY IDENTITY NOT NULL,
[FirstName] NVARCHAR(30) NOT NULL,
[LastName] NVARCHAR(30) NOT NULL,
[Age] INT NOT NULL,
[Address] NVARCHAR(30) NOT NULL,
[PassportId] NVARCHAR(11) NOT NULL,
)

CREATE TABLE LuggageTypes
(
[Id] INT PRIMARY KEY IDENTITY,
[Type] NVARCHAR(30) NOT NULL,
)

CREATE TABLE Luggages
(
[Id] INT PRIMARY KEY IDENTITY NOT NULL,
[LuggageTypeId] INT FOREIGN KEY REFERENCES LuggageTypes(Id) NOT NULL,
[PassengerId] INT FOREIGN KEY REFERENCES Passengers(Id) NOT NULL
)

CREATE TABLE Tickets
(
[Id] INT PRIMARY KEY IDENTITY NOT NULL,
[PassengerId] INT FOREIGN KEY REFERENCES Passengers(Id) NOT NULL,
[FlightId] INT FOREIGN KEY REFERENCES Flights(Id) NOT NULL,
[LuggageId] INT FOREIGN KEY REFERENCES Luggages(Id) NOT NULL,
[Price] MONEY NOT NULL
)



--2 Insert
INSERT INTO Planes
([Name], [Seats], [Range])
VALUES
('Airbus 336', 112, 5132),
('Airbus 330', 432, 5325),
('Boeing 369', 231, 2355),
('Stelt 297', 254, 2143),
('Boeing 338', 165, 5111),
('Airbus 558', 387, 1342),
('Boeing 128', 345, 5541)


INSERT INTO LuggageTypes
([Type])
VALUES
('Crossbody Bag'),
('School Backpack'),
('Shoulder Bag')



--3 Update
UPDATE TICKETS 
SET Price += Price * 0.13
WHERE FlightId IN (SELECT [Id] FROM Flights
WHERE Destination = 'Carlsbad'

--4 Delete
DELETE FROM Tickets
WHERE FlightId IN(
SELECT Id FROM Flights
WHERE Destination = 'Ayn Halagim'
)

DELETE FROM Flights
WHERE Destination = 'Ayn Halagim'


--5 The "Tr" Planes
SELECT *
FROM Planes 
WHERE [Name] LIKE '%tr%'
ORDER BY [Id], [Name], [Seats], [Range]


--6 Flight Profits
SELECT f.Id AS [FlightId], SUM(t.Price) AS [Price]
FROM Flights AS f
JOIN Tickets AS t
ON t.FlightId = f.Id
GROUP BY f.Id
ORDER BY [Price] DESC, [FlightId] ASC


--7 Passenger Trips
SELECT CONCAT(p.FirstName, ' ', p.LastName) AS [Full Name],
  f.Origin,
  f.Destination
FROM Passengers AS p
JOIN Tickets AS t
ON t.PassengerId = p.Id
JOIN Flights AS f
ON t.FlightId = f.Id
ORDER BY [Full Name], f.Origin, f.Destination


--8 Non Adventures People
SELECT p.FirstName AS [First Name], p.LastName AS [Last Name], p.Age
FROM Passengers AS p
LEFT OUTER JOIN Tickets AS t
ON t.PassengerId = p.Id
WHERE t.Id IS NULL
ORDER BY Age DESC, [First Name], [Last Name]


--9 Full Info
SELECT CONCAT(p.FirstName, ' ', p.LastName) AS [Full Name],
pl.[Name] AS [Plane Name],
CONCAT(f.Origin, ' - ', f.Destination) AS [Trip],
lt.[Type] AS [Luggage Type]
FROM Passengers AS p
JOIN Tickets AS t
ON t.PassengerId = p.Id
JOIN Flights AS f
ON t.FlightId = f.Id
JOIN Planes AS pl
ON f.PlaneId = pl.Id
JOIN Luggages AS l
ON t.LuggageId = l.Id
JOIN LuggageTypes AS lt
ON l.LuggageTypeId = lt.Id
ORDER BY [Full Name], [Plane Name], f.Origin, f.Destination, [Luggage Type]


--10 PSP
SELECT p.[Name], p.Seats, COUNT(t.Id) AS [Passengers Count]
FROM Planes AS p
LEFT OUTER JOIN Flights AS f
ON f.PlaneId = p.Id
LEFT OUTER JOIN Tickets AS t
ON t.FlightId = f.Id
GROUP BY p.[Name], p.Seats
ORDER BY [Passengers Count] DESC, p.[Name], p.Seats


--11 Vacation
CREATE FUNCTION udf_CalculateTickets(@origin VARCHAR(50), @destination VARCHAR(50), @peopleCount INT)
RETURNS VARCHAR(50)
AS
BEGIN
    IF(@peopleCount <= 0)
	BEGIN
	 RETURN 'Invalid people count!';
	END

	DECLARE @flightId INT = (SELECT TOP(1) Id FROM Flights
	                         WHERE Origin = @origin AND Destination = @destination);
										IF(@flightId IS NULL)
										BEGIN
										  RETURN 'Invalid flight!';
										END
	DECLARE @pricePerPerson DECIMAL(18,2) = (SELECT TOP(1) Price
					                         FROM Tickets AS t
					                         JOIN Flights AS f
							                 ON t.FlightId = f.Id
											 WHERE f.Id = @flightId)

    DECLARE @totalPrice DECIMAL(24, 2) = @pricePerPerson * @peopleCount;
		RETURN CONCAT('Total price ', @totalPrice);
END


--12 Wrong Data
CREATE PROC usp_CancelFlights
AS
BEGIN
  UPDATE Flights
  SET DepartureTime = NULL, ArrivalTime = NULL
  WHERE DATEDIFF(SECOND, DepartureTime, ArrivalTime) > 0
END