
-- Sample data for the `users` table
INSERT INTO `users` (`email`, `password`, `role`) VALUES
('john.doe@example.com', 'password123', 'student'),
('jane.smith@example.com', 'password456', 'student'),
('peter.jones@example.com', 'password789', 'faculty'),
('susan.davis@example.com', 'password101', 'faculty'),
('admin@example.com', 'adminpass', 'admin');

-- Sample data for the `students` table
INSERT INTO `students` (`first_name`, `last_name`, `email`, `major`, `enrollment_date`) VALUES
('John', 'Doe', 'john.doe@example.com', 'Computer Science', '2023-01-15'),
('Jane', 'Smith', 'jane.smith@example.com', 'Mechanical Engineering', '2023-01-15'),
('Alice', 'Johnson', 'alice.j@example.com', 'Physics', '2022-09-01'),
('Bob', 'Williams', 'bob.w@example.com', 'Chemistry', '2022-09-01');

-- Sample data for the `faculty` table
INSERT INTO `faculty` (`first_name`, `last_name`, `email`) VALUES
('Peter', 'Jones', 'peter.jones@example.com'),
('Susan', 'Davis', 'susan.davis@example.com');

-- Sample data for the `courses` table
INSERT INTO `courses` (`course_code`, `course_name`, `credits`, `instructor_id`) VALUES
('CS101', 'Introduction to Computer Science', 3, 1),
('MECH201', 'Thermodynamics', 4, 2),
('PHY101', 'General Physics I', 4, 1),
('CHEM101', 'General Chemistry I', 4, 2);

-- Sample data for the `enrollments` table
INSERT INTO `enrollments` (`student_id`, `course_id`, `enrollment_date`) VALUES
(1, 1, '2023-01-20'),
(1, 3, '2023-01-20'),
(2, 2, '2023-01-20'),
(2, 4, '2023-01-20'),
(3, 1, '2022-09-05'),
(3, 3, '2022-09-05');

-- Sample data for the `grades` table
INSERT INTO `grades` (`enrollment_id`, `assignment_name`, `grade`, `date_recorded`) VALUES
(1, 'Midterm Exam', 'A', '2023-03-15'),
(1, 'Final Exam', 'B+', '2023-05-10'),
(2, 'Project 1', 'A-', '2023-04-01'),
(3, 'Lab Report 1', 'B', '2023-02-28');

-- Sample data for the `attendance` table
INSERT INTO `attendance` (`enrollment_id`, `date`, `present`) VALUES
(1, '2023-02-01', TRUE),
(1, '2023-02-03', TRUE),
(1, '2023-02-06', FALSE),
(2, '2023-02-02', TRUE),
(2, '2023-02-04', TRUE);
