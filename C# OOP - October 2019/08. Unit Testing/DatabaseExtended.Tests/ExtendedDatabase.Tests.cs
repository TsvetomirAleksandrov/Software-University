using NUnit.Framework;

namespace Tests
{
    using ExtendedDatabase;
    using System;

    public class ExtendedDatabaseTests
    {
        private Person person1;
        private Person person2;

        [SetUp]
        public void Setup()
        {
            person1 = new Person(123456789123456789, "Peter");
            person2 = new Person(10, "Steven");
        }

        [Test]
        public void ConstructorShouldInitializeAPerson()
        {
            long id = 9826192486;
            string userName = "Pesho";
            Person person = new Person(id, userName);

            Assert.AreEqual(id, person.Id);
            Assert.AreEqual(userName, person.UserName);
        }

        [Test]
        public void DatabaseConstructorShouldInitializeCorrectly()
        {
            var people = new Person[] { person1, person2 };
            var dataBase = new ExtendedDatabase(people);

            var expectedCount = people.Length;
            var actualCount = dataBase.Count;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [Test]
        public void AddShouldIncreaseTheCountOfTheDatabase()
        {
            var db = new ExtendedDatabase();

            db.Add(person1);
            db.Add(person2);
            var expectedCount = 2;

            Assert.AreEqual(expectedCount, db.Count);
        }

        [Test]
        public void ShouldThrowInvalidOperationExceptionWhenTryingToAddMoreThan16People()
        {
            var tempName = "A";
            var tempId = 0L;
            var db = new ExtendedDatabase();

            for (long i = 0; i < 16; i++)
            {
                tempName = tempName + "A";
                tempId += i;
                var person = new Person(tempId, tempName);
                db.Add(person);
            }

            Assert.Throws<InvalidOperationException>(() => db.Add(person1));
        }

        [Test]
        public void InvalidOperationExceptionShouldBeTrownWhenAddingPersonWithTheSameName()
        {
            var db = new ExtendedDatabase();
            db.Add(person1);

            Assert.Throws<InvalidOperationException>(() => db.Add(new Person(1, "Peter")));
        }

        [Test]
        public void InvalidOperationExceptionShouldBeTrownWhenAddingPersonWithTheSameId()
        {
            var db = new ExtendedDatabase();
            db.Add(person1);

            Assert.Throws<InvalidOperationException>(() => db.Add(new Person(123456789123456789, "G")));
        }

        [Test]
        public void RemoveShouldDecreaseTheCountOfTheDatabase()
        {
            var db = new ExtendedDatabase();

            db.Add(person1);
            db.Add(person2);
            db.Remove();
            var expectedCount = 1;

            Assert.AreEqual(expectedCount, db.Count);
        }

        [Test]
        public void InvalidOperationExceptionShouldBeTrownWhenTryingToRemoveFromEmptyDatabase()
        {
            var db = new ExtendedDatabase();

            Assert.Throws<InvalidOperationException>(() => db.Remove());
        }

        [Test]
        public void FindByNameShouldTrowInvalidOperationExceptionIfThereIsNoSuchPersonInTheRecord()
        {
            var db = new ExtendedDatabase();
            db.Add(person1);

            Assert.Throws<InvalidOperationException>(() => db.FindByUsername("Ivan"));
        }

        [Test]
        public void FindByNameShouldTrowArgumentNullExceptionIfTheNameIsNull()
        {
            var db = new ExtendedDatabase();

            Assert.Throws<ArgumentNullException>(() => db.FindByUsername(null));
        }

        [Test]
        public void FindByNameShouldReturnTheSelectedPersonIfThePersonExistsInTheRecord()
        {
            var db = new ExtendedDatabase();
            db.Add(person1);

            Assert.AreEqual(person1, db.FindByUsername("Peter"));
        }

        [Test]
        public void FindByIdShouldTrowInvalidOperationExceptionIfThereIsNoSuchPersonInTheRecord()
        {
            var db = new ExtendedDatabase();
            db.Add(person1);

            Assert.Throws<InvalidOperationException>(() => db.FindById(15));
        }

        [Test]
        public void FindByIdShouldTrowArgumentOutOfRangeExceptionIfTheIdIsNegativeNumber()
        {
            var db = new ExtendedDatabase();

            Assert.Throws<ArgumentOutOfRangeException>(() => db.FindById(-5));
        }

        [Test]
        public void FindByIdShouldReturnTheSelectedPersonIfThePersonExistsInTheRecord()
        {
            var db = new ExtendedDatabase();
            db.Add(person1);

            Assert.AreEqual(person1, db.FindById(123456789123456789));
        }

        [Test] 
        public void ShouldThrowArgumentExceptionWhenTryingToAddMoreThan16People()
        {
            var tempName = "A";
            var tempId = 0L;
            var array = new Person[17];

            for (long i = 0; i < 17; i++)
            {
                tempName = tempName + "A";
                tempId += i;
                var person = new Person(tempId, tempName);
                array[i] = person;
            }

            Assert.Throws<ArgumentException>(() => new ExtendedDatabase(array));
        }

        [Test] 
        public void AddRangeMethodLenghtShouldBeEqualToDatabaseCount()
        {
            var tempName = "A";
            var tempId = 0L;
            var array = new Person[15];

            for (long i = 0; i < 15; i++)
            {
                tempName = tempName + "A";
                tempId += i;
                var person = new Person(tempId, tempName);
                array[i] = person;
            }

            var db = new ExtendedDatabase(array);

            Assert.AreEqual(array.Length, db.Count);
        }


    }
}