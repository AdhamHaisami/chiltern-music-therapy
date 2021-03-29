DROP TYPE IF EXISTS user_roles CASCADE;
DROP TYPE IF EXISTS user_statuses CASCADE;
DROP TYPE IF EXISTS media_types CASCADE;
DROP TYPE IF EXISTS programme_statuses CASCADE;

CREATE TYPE user_roles AS ENUM('CLIENT', 'THERAPIST', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE user_statuses AS ENUM('INVITED', 'ACTIVE', 'DELETED');
CREATE TYPE media_types AS ENUM('PROFILE_IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'IMAGE');
CREATE TYPE programme_statuses AS ENUM('ACTIVE', 'COMPLETED', 'DELETED');