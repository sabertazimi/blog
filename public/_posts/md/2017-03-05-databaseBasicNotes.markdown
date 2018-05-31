---
layout:     post
title:      "Database Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Computer Science
    - Database
---

* [Database Basic Notes](#database-basic-notes)
	* [Basic Concepts](#basic-concepts)
		* [Feature](#feature)
		* [Common Words](#common-words)
		* [Normalized Design](#normalized-design)
	* [Data Format](#data-format)
		* [XML](#xml)
			* [DTD(Document Type Definition)](#dtddocument-type-definition)
			* [XSD(XML Schema Definition)](#xsdxml-schema-definition)
		* [JSON(JavaScript Object Notation)](#jsonjavascript-object-notation)
	* [Relational Algebra](#relational-algebra)
		* [Operators](#operators)
	* [Higher-Level Database Design Models](#higher-level-database-design-models)
		* [UML(Unified Modeling Language)](#umlunified-modeling-language)
			* [Classes](#classes)
			* [Associations](#associations)
			* [Associations Classes](#associations-classes)
			* [Subclasses](#subclasses)
			* [Composition and Aggregation](#composition-and-aggregation)
		* [E/R Model(Entity-Relationship Model)](#er-modelentity-relationship-model)
	* [SQL](#sql)
	* [Nosql - MongoDB Basic Notes](#nosql---mongodb-basic-notes)
		* [Set Up](#set-up)
			* [Install](#install)
			* [Not Upgrade](#not-upgrade)
			* [Start/Stop/Restart](#startstoprestart)
			* [Uninstall](#uninstall)
		* [Shell Instruction](#shell-instruction)
			* [create and drop](#create-and-drop)
				* [create](#create)
				* [drop](#drop)
			* [query](#query)
			* [insert](#insert)
			* [information](#information)
				* [database](#database)
				* [collection](#collection)

# Database Basic Notes

## Basic Concepts

### Feature

*   Massive
*   Persistent
*   Safe
*   Multi-user
*   Convenient
*   Efficient
*   Reliable

### Common Words

*   create/drop(from)/insert into/delete from/update
*   restricts
*   sub-queries
*   views(shorthand for queries)
*   left/right join on ...
*   primary/foreign key
*   references

> (id, name, birth, majar, grade) is not normalized, because grade is not relevant to student id

> (id, name, birth) + (id, majar, grade) is normalized

> (name, os, lang) is not mormalized, because os isn't relevant to lang

> (name, os) + (name, lang) is normalized

> Data-intensive applications may not use DBMS/Query Language at all

> e.g Hadoop, all operations on data stores in files

## Data Format

### XML

*   single root element
*   matched tags with proper nesting
*   unique attributes within elements

#### DTD(Document Type Definition)

*   similar grammar to regular expression(`*?`)
*   ID/IDRef should be unique
*   CDATA: character data
*   (#PCDATA): parsed character data (plain text between tags)

```xml
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE Bookstore [
    <!ELEMENT Bookstore (Book)*>
    <!ELEMENT Book (Title, Authors, Remark?)>
    <!ATTLIST Book  ISBN ID #REQUIRED
                    Price CDATA #REQUIRED
                    Authors IDREFS #REQUIRED>
    <!ELEMENT Title (#PCDATA)>
    <!ELEMENT Remark (#PCDATA | BookRef)*>
    <!ELEMENT BookRef EMPTY>
    <!ATTLIST BookRef book IDREF #REQUIRED>
    <!ELEMENT Authors (Author)*>
    <!ELEMENT Author (First_Name, Last_Name)>
    <!ATTLIST Author Ident ID #REQUIRED>
    <!ELEMENT First_Name (#PCDATA)>
    <!ELEMENT Last_Name (#PCDATA)>
]>

<Bookstore>
    <Book ISBN="ISBN-0-23-23333-233" Price="233" Authors="Sabertazimi">
        <Title>Kind of sword</Title>
        <Authors>
            <Author Ident="Sabertazimi">
                <First_Name>Yilong</First_Name>
                <Last_Name>Liu</Last_Name>
            </Author>
        </Authors>
    </Book>
</Bookstore>
```

tools: xmlcopyeditor xmllint

```sh
$ xmllint --valid --noout Bookstore.xml
```

#### XSD(XML Schema Definition)

```sh
$ xmllint -schema Bookstore.xsd -noout Bookstore.xml
```

### JSON(JavaScript Object Notation)

*   serializing data objects in files
*   human-readable data
*   semi-structured data
*   number/boolean/string/array/object(empty or key-value pair) recursive constructs

## Relational Algebra

### Operators

*   select operator σ(sigma): `σ(sID < 100 ^ sAge > 20)Table_Name` set constraints
*   project operator π(pi)  :   `π(sID, GPA)Table_Name` select certain columns
*   cross-product operator x: Table1 x Table2, m tuples(rows) x n tuples(rows) => m*n tuples(rows)
*   natural join operator ∞: σ(E1.A1 = E2.A1 ^ E1.A2 = E2.A2 ...) (E1 x E2)
*   theta join operator ∞(cond): σ(cond) (E1 x E2), call cond as ϴ
*   difference operator -: matching schemas => change rows/tuples
*   union/intersection operator ∪ / ∩: matching schemas => change rows/tuples
*   rename operator ρ: change schemas(attributes name), different schemas <=> same schemas (**union/intersection/self-join**)
*   assign statement :=
*   tree notation

```sql
π(sID, GPA) (σ(sID < 100 ^ GPA > 3.7) Student)
```

## Higher-Level Database Design Models

Higher-Level Database Design Models `-Translator->` Relational implemented by RDBMS

### UML(Unified Modeling Language)

#### Classes

for data modeling: 

*   add PK(primary key)
*   drop methods

```uml
-----------
| student |
|---------|
|sID   PK |
|sName    |
|GPA      |
|---------|
|<methods>|
-----------
```

#### Associations

relationships between objects of 2 classes):

*   one to one: 1..1  --- 1..1
*   many to one: *    --- 1..1
*   one to many:1..1  ---  *
*   many to many: *   ---  *

```uml
-----------                   ---------
| student |                   |collegs|
|---------|                   |       |
|sID   PK |x..y   Apply   m..n|       |
|sName    |-------------------|       |
|GPA      |                   |       |
|---------|                   |       |
|<methods>|                   |       |
-----------                   ---------
```

#### Associations Classes

*   classes store information of relationship edge between 2 data classes
*   unnecessary if 0..1 or 1..1

```uml
c1 * --- 1..1 c2
information of relationship edge can stored in c1
owing to every object of c1 only associated with 1 object of c2
```

#### Subclasses

children classes

#### Composition and Aggregation

### E/R Model(Entity-Relationship Model)

## SQL

*   select ... from ... where
*   insert into ... ...
*   delete from ... where ...
*   update ... set ... = ... where ...

```sql
DROP VIEW IF EXISTS Standings;
DROP VIEW IF EXISTS Count;
DROP VIEW IF EXISTS Wins;
DROP TABLE IF EXISTS Matches;
DROP TABLE IF EXISTS Players;

-- Players Table
CREATE TABLE Players (
	id SERIAL primary key,
	name varchar(255)
);

-- Matches Table
CREATE TABLE Matches (
	id SERIAL primary key,
	player int references Players(id),
	opponent int references Players(id),
	result int
);

-- Wins View shows number of wins for each Player
CREATE VIEW Wins AS
	SELECT Players.id, COUNT(Matches.opponent) AS n 
	FROM Players
	LEFT JOIN (SELECT * FROM Matches WHERE result>0) as Matches
	ON Players.id = Matches.player
	GROUP BY Players.id;

-- Count View shows number of matches for each Player
CREATE VIEW Count AS
	SELECT Players.id, Count(Matches.opponent) AS n 
	FROM Players
	LEFT JOIN Matches
	ON Players.id = Matches.player
	GROUP BY Players.id;

-- Standings View shows number of wins and matches for each Player
CREATE VIEW Standings AS 
	SELECT Players.id,Players.name,Wins.n as wins,Count.n as matches 
	FROM Players,Count,Wins
	WHERE Players.id = Wins.id and Wins.id = Count.id;
```

## Relational Design

### Decomposition

*   start with mega-relations: including all attributes
*   decompose into smaller relations(BCNF/4NF)

### functional dependencies

*   A -> B => 1-1/n-1 mapping
*   key sets: closure of sets contains all attributes

> assuming relation R(A, B, C, D, ..., G)

> andclosure of A, B {A, B}+ `A->C->D, B->E->F, F->G` => {A, B}+ = {A, B, C, ..., G}

> then, {A, B} is a key

> if there no exists such closure, then treat all-attributes as a key

### **BCNF** (boyce-codd normal form)

*   for each A -> B having A is super key && B isn't key
*   not exists A -> B -> C
*   here's the algorithm:

```cpp
/*
 * @brief fixed point algorithm just like most algorithms from compiler
 * 
 * by decomposing to transform non-key dependent attributes to key dependent attributes
 */

compute FDs for R
compute key for R using its FDs

while (there is relation R' aren't in BCNF) {
    pick any R' with A -> B that violates BCNF (A is not its key)
    decompose R' into R1(A, B) and R2(A, rest)
    compute FDs for R1 and R2
    compute keys for R1 and R2 using their FDs
}
```

### multivalued dependencies

*   A -> B && rest attributes => A ->> B
*   A ->> B(1-n mapping), A ->> C(1-n mapping), no `B -> C`/`C ->> B`, B * C redundant tuples/rows
*   A ->>B && A ->>C => A ->> B∩C
*   A ->>B && B ->>C => A ->> C-B

### 4NF(forth normal form)

*   if A ->> B then A is key && B isn't key
*   here's the algorithm:

```cpp
/*
 * @brief fixed point algorithm just like most algorithms from compiler
 *
 * by decomposing to transform non-key dependent attributes to key dependent attributes
 */

compute FDs and MVDs for R
compute key for R using its FDs

while (there is relation R' aren't in 4NF) {
    pick any R' with A ->> B that violates 4NF(A is not its key)
    decompose R' into R1(A, B) and R2(A, rest)
    compute FDs and MVDs for R1 and R2
    compute keys for R1 and R2 using their FDs
}
```

### Normalized Design

*   every row has the same number of columns
*   every row has a unique key(PRIMARY KEY)
*   everything in a row is all relevant to unique key
*   everything in a row is all relevant to each other

## Indexes

*   primary mechanism to improve performance of database
*   persist data structures stored in database (hash tables/B trees/B+ trees)
*   trade off: `scale of database` and `workload(query/update rate)` as input of physical design advisors

```sql
CREATE INDEX IndexName on T(A)
CREATE INDEX IndexName on T(A1, A2, ..., An)
CREATE UNIQUE INDEX IndexName on T(A)
DROP INDEX IndexName
```

## Transactions

*   a sequence of one/more SQL operations treated as a unit
*   target: concurrency and failures recovery

### Transaction Standard

*   all or nothing(atomicity)
*   transaction begins automatically on first SQL statement
*   on "commit": old transaction ends, new one begins
*   on session termination: current transaction ends
*   "autocommit" turns each statement into transaction

### ACID Properties

*   Atomicity(Logging)
*   Consistency
*   Isolation: guarantee serializability(Locking)
*   Durability(Logging)

#### Isolation Level

weaker isolation level: read uncommitted < read committed < repeatable read < serializable

*   increased concurrency + decreased overhead = increased performance
*   weaker consistency guarantees
*   some system default: repeatable read

```sql
SET TRANSACTION READ ONLY;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

## Integrity Constraints

```sql
CREATE TABLE TableName (
    ... PRIMARY KEY,
    ... UNIQUE,
    ... CHECK (Condition),
    ... references TableName(ForeignKey),
    ... references TableName(ForeignKey) ON DELETE/UPDATE RESTRICT/SET NULL/CASCADE,
    ... ,
    PRIMARY KEY (Attr1, Attr2, ...),
    UNIQUE (Attr1, Attr2, ...),
    CHECK (Condition),
    FOREIGN KEY (Attr1, Attr2, ...) references TableName(Bttr1, Bttr2, ...) [ ON ... (default RESTRICT) ]
);

CREATE ASSERTION AssertionName
CHECK (Condition);
```

## Triggers (DBMS Level Constraints)

```sql
CREATE TRIGGER TriggerName
BEFORE|AFTER|INSTEAD OF Events(INSERT/UPDATE OF/DELETE ON TableName)
[ referencing-variables ]
[ FOR EACH ROW ]
WHEN ( Condition )
[ BEGIN ]
Action
[ END ];

CREATE TRIGGER Cascade
After DELETE ON S
REFERENCING OLD ROW AS O
FOR EACH ROW
DELETE FROM R WHERE A = O.B (R.A = S.B)

CREATE TRIGGER Cascade
After DELETE ON S
REFERENCING OLD TABLE AS OT
DELETE FROM R WHERE A IN (SELECT B FROM BT)
```

## Views

*   logical layer: hiding data from users
*   modularity and reuse of query

```sql
VIEW ViewName = VIEWQUERY (R1, R2, ..., Rn)

CREATE VIEW ViewName (T1, T2, ..., Tn) AS
< Query >
```

### Modifications on Views

owing to views are logical layer, it's senseless to modify data on views

#### Implements Modification with Triggers

```sql
CREATE TRIGGER TriggerName
INSTEAD OF DELETE/UPDATE OF/INSERT ON ViewName
[ referencing-variables ]
[ FOR EACH ROW ]
WHEN ( Condition )
[ BEGIN ]
Action
[ END ];
```

#### SQL Standard - Updatable Views

*   SELECT (no DISTINCT) on single table T
*   no GROUP BY/HAVING or Aggregation
*   attributes can't be NULL/default values
*   sub-queries cant' refer to table T

```sql
CREATE VEIW
...
WITH CHECK OPTION;
```

## Nosql - MongoDB Basic Notes

### Set Up

#### Install

```shell
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list 
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org mongodb-org-server mongodb-org-shell mongodb-org-mongos mongodb-org-tools
```

#### Not Upgrade

```shell
$ echo "mongodb-org hold" | sudo dpkg --set-selections
$ echo "mongodb-org-server hold" | sudo dpkg --set-selections
$ echo "mongodb-org-shell hold" | sudo dpkg --set-selections
$ echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
$ echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

#### Start/Stop/Restart

```shell
$ sudo service mongod start
$ sudo service mongod stop
$ sudo service mongod restart
```

#### Uninstall

```shell
$ sudo service mongod stop
$ sudo apt-get purge mongodb-org*
$ sudo rm -r /var/log/mongodb
$ sudo rm -r /var/lib/mongodb
```

### Shell Instruction

#### create and drop

##### create

```sh
use test
show dbs
```

##### drop

```sh
use dbToDrop
db.dropDatabase()
```

#### query

```sh
db.collection.find().pretty()
```

#### insert

```sh
db.collection.insert(ison);
```

#### information

##### database

```sh
db.getName()
db.stats()
db.version()
db.getMongo()
```

##### collection

```sh
db.getCollectionNames()
db.printCollectionStats()
```


