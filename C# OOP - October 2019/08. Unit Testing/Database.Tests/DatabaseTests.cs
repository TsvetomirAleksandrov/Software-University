namespace Tests
{
    using ExtendedDatabase;
    using NUnit.Framework;
    using System;

    public class ExtendedDatabaseTests
    {
        [Test]
        public void PersonClassConstructorShouldSetCorrectly()
        {
            long id = 123456789;
            string userName = "Petya";

            Person person = new Person(id, userName);

            long expectedId = id;
            string expectedUserName = userName;

            long actualId = person.Id;
            string actualUserName = person.UserName;

            Assert.AreEqual(expectedId, actualId);
            Assert.AreEqual(expectedUserName, actualUserName);
        }

        [Test]
        public void ExtendetDatabseClassConstructorShouldSetCorrectlyWitNoParams()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            int expectedCount = 0;
            int actualCount = extendedDatabase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void ExtendetDatabaseClassConstructorShouldSetCorrectlyWithOnePerson()
        {
            long id = 123456789;
            string userName = "Petya";

            Person person = new Person(id, userName);
            ExtendedDatabase extendedDatabase = new ExtendedDatabase(person);

            int expectedCount = 1;
            int actualCount = extendedDatabase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void ExtendetDatabaseClassConstructorShouldWorkCorrectlyWith16Persons()
        {
            Person[] people = new Person[16];

            for (int i = 0; i < people.Length; i++)
            {
                people[i] = new Person(i, "ppp" + i);
            }

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(people);

            int expectedCount = people.Length;
            int actualCount = extendedDatabase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void AddRangeMethodShouldThrowArgumentExceptionWithMoreThan16People()
        {
            Person[] people = new Person[17];

            for (int i = 0; i < people.Length; i++)
            {
                people[i] = new Person(i, "ppp" + i);
            }

            Assert.Throws<ArgumentException>(() => new ExtendedDatabase(people));
        }

        [Test]
        public void AddMethodShouldWorkCorrectly()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            extendedDatabase.Add(new Person(0, "p"));
            extendedDatabase.Add(new Person(1, "f"));

            int expectedCount = 2;
            int actualCount = extendedDatabase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void AddMethodShouldThrowInvalidOperationExceptionWhenCountIs16People()
        {
            Person[] people = new Person[16];

            for (int i = 0; i < people.Length; i++)
            {
                people[i] = new Person(i, "ppp" + i);
            }

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(people);

            Assert.Throws<InvalidOperationException>(() => extendedDatabase.Add(new Person(000, "ppp")));
        }

        [Test]
        public void AddMethodShouldThrowInvalidOperationExceptionWhenAcceptsPersonWithTheSameUsername()
        {
            Person person = new Person(0, "p");

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(person);

            Assert.Throws<InvalidOperationException>(() => extendedDatabase.Add(new Person(1, "p")));
        }

        [Test]
        public void AddMethodShouldThrowInvalidOperationExceptionWhenAcceptsPersonWithTheSameId()
        {
            Person person = new Person(0, "p");

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(person);

            Assert.Throws<InvalidOperationException>(() => extendedDatabase.Add(new Person(0, "petya")));
        }

        [Test]
        public void RemoveMethodShouldRemoveCorrectly()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            extendedDatabase.Add(new Person(0, "p"));
            extendedDatabase.Add(new Person(1, "h"));
            extendedDatabase.Remove();

            int expectedCount = 1;
            int actualCount = extendedDatabase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void RemoveMethodShouldThrowInvalidOperationExceptionWhenArrayIsEmpty()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            Assert.Throws<InvalidOperationException>(() => extendedDatabase.Remove());
        }

        [Test]
        public void FindByUsernameMethodShouldWorkCorrectly()
        {
            Person expectedPerson = new Person(1, "Petya");

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(expectedPerson);

            Person actualPerson = extendedDatabase.FindByUsername("Petya");

            Assert.AreEqual(expectedPerson, actualPerson);
        }

        [Test]
        public void FindByUsernameMethodShouldThrowArgumentNullExceptionWhenNameIsNull()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            Assert.Throws<ArgumentNullException>(() => extendedDatabase.FindByUsername(null));
        }

        [Test]
        public void FindByUsernameMethodShouldThrowArgumentNullExceptionWhenNameIsEmpty()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            Assert.Throws<ArgumentNullException>(() => extendedDatabase.FindByUsername(""));
        }

        [Test]
        public void FindByUsernameMethodShouldThrowInvalidOperationExceptionWhenNameIsNotFound()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase(new Person(0, "p"));

            Assert.Throws<InvalidOperationException>(() => extendedDatabase.FindByUsername("o"));
        }

        [Test]
        public void FindByIdMethodShouldWorkCorrectly()
        {
            Person expectedPerson = new Person(1, "Petya");

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(expectedPerson);

            Person actualPerson = extendedDatabase.FindById(1);

            Assert.AreEqual(expectedPerson, actualPerson);
        }

        [Test]
        public void FindByIdMethodShouldThrowArgumentOutOfRangeExceptionWhenIdIsLessThanZero()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase();

            Assert.Throws<ArgumentOutOfRangeException>(() => extendedDatabase.FindById(-1));
        }

        [Test]
        public void FindByIdMethodShouldThrowInvalidOperationExceptionWhenIdIsNotFound()
        {
            ExtendedDatabase extendedDatabase = new ExtendedDatabase(new Person(0, "p"));

            Assert.Throws<InvalidOperationException>(() => extendedDatabase.FindById(1));
        }

        [Test]
        public void Test()
        {
            Person person1 = new Person(10, "Niki");
            Person person2 = new Person(0, "Petya");

            ExtendedDatabase extendedDatabase = new ExtendedDatabase(person1);
            extendedDatabase.Add(person2);
            extendedDatabase.Remove();

            int expectedCount = 1;
            int actualCount = extendedDatabase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }
    }
}