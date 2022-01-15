This file is dedicated to show my answers regarding the first section of the test: the mini-questionnaire. This file is structured as a Question-Answer pairs.

### 1. Explain how Object Oriented Programming works with a thorough understanding of the keyword this and the new keyword

In short, the key explanation relies on the name itself. Where traditional programming (prior to OOP) are mostly consisting of functions that takes in an input (parameter) and provides an output (return value), OOP mostly revolves around *objects*. An object is basically a data that consists of another data, such as the object `Person` that has `name` and `age` as a data/property.

Furthermore on this, there are two important concepts we need to understand: `Classes` and `instances`. A Class is basically a blueprint for an object, that tells that every single object that falls within the same class have the same properties (`Person` is actually the class, not the object itself, as every person has a name and an age); while an instance is a particular copy of the Class that has unique data compared to other instances of the same class (i.e. an instance with the name 'Mario' is different with a 'Luigi', and they may have different age, etc.).

To create an instance of a Class, you can use the `new` syntax (i.e. `new Person()`), and store it in a certain variable (i.e. `let mario = new Person()`). After initiating an instance, you may access its properties in however manner you prefer, such as `mario.name`. Should you need to access a property from within the instance itself, say, from a Class method/function, you can refer to that particular instance using the keyword `this`, with syntax such as `this.name` instead of `mario.name`.

### 2. What is the new class syntax and how to create instance methods, class methods?

Create new instance         : `new Person()`
Create an instance method   : `myFunc() { ... }` from within the class
Create a class method       : `static myFunc() { ... }` from within the class

### 3. Give an example of how to implement inheritance in ES2015 using extends and super

ES2015 = ES6

```
class Person {
    funcA = () => {
        ...
    };
}

class Father extends Person {
    funcB = () => {
        super.funcA();    // Calls the funcA function of the parent class
    };
}
```

### 4. Imagine refactoring an ES5 application to use ES2015, how would you go about it?

First of all, identify the types of each classes/objects/variables, and see whether they are still the appropriate type in ES6. This is important, because there are a lot of new syntax in ES6 that might lookt he same but has different uses.

For example, the arrow function (`myFunc = () => { ... }`) is actually different with a regular function (`myFunc() { ... }`). Traditional instance function always replaces the keyword `this` with the current instance being worked at, while arrow function does not replace the `this` keyword. That means, advanced uses such as inheritance or pointers may work differently in ES6 compared to ES5 (ES6 being cleaner, obviously).

And thus, converting ES5 syntax to ES6 syntax without understanding the actual usage of each classes/objects/variables might result in breaking the code. ES5 to ES6 conversion should be done to untangle codes, but if changing the syntax without untangling the logic itsself, would mean there is little to no improvement to the existing code.

### 5. Give an example of how you structure applications with design patterns using closure and modules

Honestly speaking, I am not familiar with closures and modules. I did a little bit of research, and based on what i understand, it seems like those are design patterns to ensure the code we write are clean and manageable. Also based on what i understand, i think i have implemented said patterns throughout my code as well. But I believe you guys are a better judge than myself.

With that being said, I'll try to give some example:

```
class Person {
    var str, agi, int;

    selectJob = (job) => {
        if (!job.checkRequirement(this)) {
            throw new Exception('This person does not meet the minimum stats!);
        }

        this.job = job;
    };
}

class Job {

    checkRequirement = (person) => {
        let minStr, minAgi, minInt;

        if (person.str < minStr) return false;
        if (person.agi < minAgi) return false;
        if (person.int < minInt) return false;

        return true;
    }
}
```

Not sure if this is relevant, but this is what I can come up with. Modules / modular talks about separating the code based on the appropriate logic, and thus in my example the methods are placed on the appropriate classes (or modules). Closure talks about localizing the variable being used, so that it does not bloat memory and prevents unused data being accidentally used.

### 6. What are your preferred ways of testing your web application?

Unit testing and end-to-end testing are both equally important. The main difference is in the scope/granularity of the task being tested, where more granular would mean it is much easier to isolate which line/block of code or file that causes the error. However, since unit tests only can test a particular section of the workflow, sometimes it is impossible to test using real data, and we have to resort to using mocks. And this might mean that errors caused due to data transfer between two (or more) parts of the code cannot be triggered using unit tests, and can only be identified during end-to-end testing.

### 7. Which web server do you use? Why? Explain pros and cons of your choice.

Web server as in web hosting or web server as in backend server? I'll answer both anyway.

For web hosting, my personal experience (and preference as well) is to use a blank virtual machine using ubuntu (on any provider, but my experience is with AWS), with NGINX as a gateway & reverse proxy. NGINX would only need to point to the appropriate directory according to the site the client is trying to reach.

For backend server, I suppose anything with a microservices architecture would be sufficient, as with microservices it would be very scalable and can tackle practically any number of request.

### 8. What is your preferred production deployment process?

Personally, I have only worked with cloning github on the server itself. However, I am aware that most engineers prefers to use CI/CD. I would like to learn more on that if i ever had the chance.

### 9. Give an example of clean README.md documentation.

Please refer to the README on this project
