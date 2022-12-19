CREATE TABLE chips (
    chips VARCHAR(255)
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    note VARCHAR,
    note_text VARCHAR,
    file_dir VARCHAR[],
    selected_chips VARCHAR[]
);