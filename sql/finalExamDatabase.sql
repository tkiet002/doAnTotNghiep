create table Roles(
    role_id int not null auto_increment,
    role_name nvarchar(255),
    contraint PK_Roles primary key (role_id)
)

create table Users(
    user_id int not null auto_increment,
    name nvarchar(255),
    username nvarchar(255),
    user_password varchar(255),
    role int not null,
    email nvarchar(255),
    constraint PK_USER primary key (user_id)
)
alter table Users add constraint FK_USER_ROLE foreign key (role) references (role_id);
CREATE TABLE Class(
    class_id int not null auto_increment,
    class_name nvarchar(255),
    created_by int,
    created_at date default (current_date),
    constraint PK_CLASS primary key(class_id)
);
alter table Class add constraint FK_CLASS_USER foreign key(class_id) references Users(id);
CREATE TABLE Lessons(
    lesson_id int not null auto_increment,
    lesson_name nvarchar(255),
    created_by int,
    created_at date default (current_date),
    time_limited int,
    need_explain boolean,
    constraint PK_CLASS primary key(lesson_id)
);
alter table Lessons add constraint FK_LESSON_USER foreign key(created_by) references Users(id);

create table Question(
    question_id int not null auto_increment,
    question_text text,
    is_active boolean default 1,
    lesson_id int,
    explaination text,
    constraint PK_QUESTION primary key(question_id)
);
alter table Question add constraint FK_QUESTION_USER foreign key(created_by) references Users(id);
create table Question_Choice(
    choice_id int not null,
    question_id int not null,
    choice_text text,
    constraint PK_Question_Choice primary key(choice_id)
);
alter table Question_Choice add constraint FK_QUESTION_CHOICE_QUESTION foreign key(question_id) references Question(question_id);
CREATE TABLE User_Question_Choice(
    user_id int not null auto_increment,
    choice_id int not null,
    user_answer_at date default (current_date),
    constraint PK_CLASS primary key(user_id, choice_id)
);
alter table User_Question_Choice add constraint FK_USER_QUESTION_CHOICE_USER foreign key(user_id) references Users(id);
alter table User_Question_Choice add constraint FK_USER_QUESTION_CHOICE_QUESTION_CHOICE foreign key(choice_id) references Question_Choice(choice_id);
create table User_lesson_class(
    user_id int not null,
    lesson_id int not null,
    class_id int not null,
    constraint PK_User_lesson_class primary key (user_id, lesson_id, class_id);
);

alter table User_lesson_class add constraint FK_USER_LESSON_CLASS_USER foreign key(user_id) references Users(id);
alter table User_lesson_class add constraint FK_USER_LESSON_CLASS_LESSON foreign key(lesson_id) references Lessons(lesson_id);
alter table User_lesson_class add constraint FK_USER_LESSON_CLASS_CLASS foreign key(class_id) references Class(class_id);