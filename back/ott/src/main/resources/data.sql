INSERT INTO category (name) VALUES ('상의') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO category (name) VALUES ('하의') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO category (name) VALUES ('아우터') ON DUPLICATE KEY UPDATE name=name;
