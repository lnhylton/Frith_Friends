CREATE TABLE Consumable (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(63) NOT NULL,
    datasheet VARCHAR(255),
    category VARCHAR(31),
    raw_material BOOLEAN,
    stock VARCHAR(31),
    guide VARCHAR(255),
    hidden BOOLEAN
);

CREATE TABLE Non_Consumable(
    nc_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(63),
    inventory_count INT,
    category VARCHAR(31),
    training VARCHAR(31),
    guide VARCHAR(255),
    hidden BOOLEAN
);


CREATE TABLE Machine (
     m_id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(63),
     functional BOOLEAN,
     training VARCHAR(31),
     guide VARCHAR(255)
);

CREATE TABLE Room (
     r_id INT AUTO_INCREMENT PRIMARY KEY,
     building VARCHAR(63),
     number INT,
     capacity INT
);

CREATE TABLE Storage_Medium(
     sm_id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(63),
     type VARCHAR(63),
     parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES Storage_Medium(sm_id)
);

CREATE TABLE Consumable_Location (
    c_id INT,
    r_id INT,
    sm_id INT,
    PRIMARY KEY (c_id, r_id, sm_id),
    FOREIGN KEY (c_id) REFERENCES Consumable (c_id),
    FOREIGN KEY (r_id) REFERENCES Room (r_id),
    FOREIGN KEY (sm_id) REFERENCES Storage_medium (sm_id)
);

CREATE TABLE Non_Consumable_Location (
    nc_id INT,
    r_id INT,
    sm_id INT,
    PRIMARY KEY (nc_id, r_id, sm_id),
    FOREIGN KEY (nc_id) REFERENCES Non_Consumable (nc_id),
    FOREIGN KEY (r_id) REFERENCES Room (r_id),
    FOREIGN KEY (sm_id) REFERENCES Storage_medium (sm_id)
);

CREATE TABLE Machine_Location (
    m_id INT,
    r_id INT,
    sm_id INT,
    PRIMARY KEY (m_id, r_id, sm_id),
    FOREIGN KEY (m_id) REFERENCES Machine (m_id),
    FOREIGN KEY (r_id) REFERENCES Room (r_id),
    FOREIGN KEY (sm_id) REFERENCES Storage_medium (sm_id)
);
