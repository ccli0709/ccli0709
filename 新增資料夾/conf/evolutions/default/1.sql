# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table member (
  id                            bigserial not null,
  email                         varchar(255),
  gender                        varchar(255),
  name                          varchar(255),
  facebook_id                   varchar(255),
  facebook_email                varchar(255),
  facebook_name                 varchar(255),
  last_login_time               timestamp,
  create_time                   timestamp,
  update_time                   timestamp,
  constraint pk_member primary key (id)
);

create table member_role (
  member_id                     bigint not null,
  role_id                       bigint not null,
  constraint pk_member_role primary key (member_id,role_id)
);

create table role (
  id                            bigserial not null,
  name                          varchar(255),
  description                   varchar(255),
  create_time                   timestamp,
  constraint pk_role primary key (id)
);

create table task (
  id                            bigserial not null,
  name                          varchar(255),
  done                          boolean,
  due_date                      timestamp,
  constraint pk_task primary key (id)
);

alter table member_role add constraint fk_member_role_member foreign key (member_id) references member (id) on delete restrict on update restrict;
create index ix_member_role_member on member_role (member_id);

alter table member_role add constraint fk_member_role_role foreign key (role_id) references role (id) on delete restrict on update restrict;
create index ix_member_role_role on member_role (role_id);


# --- !Downs

alter table if exists member_role drop constraint if exists fk_member_role_member;
drop index if exists ix_member_role_member;

alter table if exists member_role drop constraint if exists fk_member_role_role;
drop index if exists ix_member_role_role;

drop table if exists member cascade;

drop table if exists member_role cascade;

drop table if exists role cascade;

drop table if exists task cascade;

