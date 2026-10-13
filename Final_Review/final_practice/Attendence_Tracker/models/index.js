import Student from './Student.js';
import ClassRoom from './Classroom.js';
import Attendance from './Attendance.js';

// Setup relationships
Student.hasMany(Attendance, { foreignKey: 'studentId' });
Attendance.belongsTo(Student, { foreignKey: 'studentId' });

ClassRoom.hasMany(Attendance, { foreignKey: 'classroomId' });
Attendance.belongsTo(ClassRoom, { foreignKey: 'classroomId' });

export { Student, ClassRoom, Attendance };
