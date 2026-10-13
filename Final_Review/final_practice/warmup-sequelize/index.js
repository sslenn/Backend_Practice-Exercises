import sequelize from './database.js';
import Product from './models/Products.js';
import { Op } from 'sequelize';
import User from './models/User.js';
import Profile from './models/Profile.js';
import Department from './models/Departments.js';
import Employee from './models/Employee.js';
import Student from './models/Student.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';

// Test the database connection
try {
  await sequelize.authenticate();          
  console.log('Database connected successfully!');
} catch (err) {
  console.error('Connection failed:', err);
}


await sequelize.sync({ force: true }); // Sync models with the database (force: true drops existing tables)

const p1 = await Product.create({
    name: 'Product 1',
    price: 10.99,
    stock: 100,
});

const p2 = await Product.create({
    name: 'Product 2',
    price: 19.99,
    stock: 50,
});

console.log('Products created:', p1.name, p2.name);

// get all rows
const products = await Product.findAll();
console.log('All products:', products.map(p => p.name));

// get a single row by primary key
const found = await Product.findByPk(1);
if (found) {    
    console.log('Found product:', found.name);
}else {
    console.log('Product not found');
}

// get a single row by condition

const cheap = await Product.findOne({
    where:{
        price: {
            [Op.lt]: 100, // less than 100
        },
    }
});
if (cheap) {
    console.log('Found cheap product:', cheap.name);
} else {
    console.log('No cheap product found');
}

// update and destroy

// option 1: update and save
const productToUpdate = await Product.findByPk(1);
productToUpdate.price = 12.99;
await productToUpdate.save();

console.log('Updated product:', productToUpdate.name, 'new price:', productToUpdate.price);

// option 2: update directly
const [updatedCount] = await Product.update(
    { stock: 200 },
    { where: { id: 2 } }
);
console.log('Number of products updated:', updatedCount);

// instance destroy
const productToDelete = await Product.findByPk(1);
await productToDelete.destroy();
console.log('Deleted product:', productToDelete.name);

// Statics destroy
const deletedCount = await Product.destroy({
    where: {
        price: {
            [Op.gt]: 500, // greater than 500
        },
    },
}); 

console.log('Number of products deleted:', deletedCount);


// one Department has Many Employees
Department.hasMany(Employee)
Employee.belongsTo(Department)

await sequelize.sync({ force: true }); // Sync models with the database (force: true drops existing tables)

const depts = await Department.bulkCreate([
    { name: 'HR' },
    { name: 'IT' },
    { name: 'Finance' },
]);

await Employee.bulkCreate([
    { name: 'Alice', jobTitle: 'HR Manager', DepartmentId: depts[0].id },
    { name: 'Bob', jobTitle: 'IT Specialist', DepartmentId: depts[1].id },
    { name: 'Charlie', jobTitle: 'Accountant', DepartmentId: depts[2].id },
]);


const dept = await Department.findAll({
    include:[Employee],
});

console.log('Departments with Employees:', dept.map(d => `${d.name}: ${d.Employees.map(emp => emp.name).join(', ')}`));

User.hasOne(Profile);
Profile.belongsTo(User);

await sequelize.sync({ force: true }); // Sync models with the database (force: true drops existing tables)

const user = await User.create({ username: 'john_doe', email: 'john@example.com' });
const profile = await Profile.create({ bio: 'Software Engineer', avatar: 'avatar.jpg', UserId: user.id });

const userWithProfile = await User.findOne({
    where: { id: user.id },
    include: Profile,
});
console.log('User with Profile:', userWithProfile.username, userWithProfile.Profile.bio);

// declare many to many relationship
Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

await sequelize.sync({ force: true }); // Sync models with the database (force: true drops existing tables)

const alice = await student.create({ name: 'Alice', email: '' });
const bob = await student.create({ name: 'Bob', email: '' });

const math = await Course.create({ title: 'Math 101', description: 'Basic Math' });
const physics = await Course.create({ title: 'Physics 101', description: 'Basic Physics' });

await alice.addCourse(math, { through: { grade: 'A' } });
await bob.addCourse(physics, { through: { grade: 'B' } });

const studentsWithCourses = await Student.findAll({
    include: [Course]
});


const aliceCourse = await alice.getCourses();
console.log('Alice is enrolled in:', aliceCourse.map(c => `${c.title} (${c.Enrollment.grade})`).join(', '));


Book.hasMany(Author);
Author.belongsTo(Book);

await sequelize.sync({ force: true }); // Sync models with the database (force: true drops existing tables)

const book = await Book.create({ title: 'The Great Gatsby', publishedYear: 1925, Pages: 180 });
const author = await Author.create({ name: 'F. Scott Fitzgerald', Birthdate: '1896-09-24' });
const author2 = await Author.create({ name: 'Ernest Hemingway', Birthdate: '1899-07-21' });

await book.addAuthor(author);
await book.addAuthor(author2);

const bookWithAuthors = await Book.findOne({
    where: { id: book.id },
    include: Author,
});
console.log('Book with Authors:', bookWithAuthors.title, bookWithAuthors.Authors.map(a => a.name).join(', '));