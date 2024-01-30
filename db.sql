-- initial seed script

CREATE TABLE IF NOT EXISTS public.users (
	id serial4 NOT NULL PRIMARY KEY,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	email bpchar(30) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT unique_email UNIQUE (email)
);

-- password = secret123
INSERT INTO users(email, "password") 
VALUES ('test@jumbo.com', '$2b$10$C0xp20cN0EeZF0LfX86I4O5Of0FVgdELQ.faGk8Gman1p36Sd5dCi')
ON CONFLICT (email) DO NOTHING;