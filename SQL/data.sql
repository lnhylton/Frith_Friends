INSERT INTO Consumable (c_id, name, datasheet, category, raw_material, stock, guide, hidden)
VALUES
(1, 'Solder Wire', 'Solder wire datasheet', 'Electronic Components', 0, 'In stock', 'Soldering Guide', 0),
(2, 'Resistors Pack', 'Resistor datasheet', 'Electronic Components', 0, 'In stock', 'Resistor Guide', 0),
(3, 'LEDs Assortment', 'LED datasheet', 'Electronic Components', 0, 'In stock', 'LED Usage Guide', 0),
(4, 'Heat Shrink Tubing', 'Heat Shrink datasheet', 'Cable Management', 0, 'In stock', 'Cable Management Guide', 0),
(5, 'Batteries Pack', 'Battery datasheet', 'Power Supplies', 0, 'In stock', 'Battery Usage Guide', 0),
(6, 'Soldering Iron Tips', 'Soldering Tips datasheet', 'Soldering Tools', 0, 'In stock', 'Soldering Tips Guide', 0),
(7, 'Adhesive Tapes', 'Tape datasheet', 'Adhesives', 0, 'In stock', 'Adhesive Application Guide', 0),
(8, 'Electrical Tape', 'Electrical Tape datasheet', 'Electrical Supplies', 0, 'In stock', 'Electrical Tape Guide', 0),
(9, 'Printed Circuit Boards', 'PCB datasheet', 'Prototyping Materials', 0, 'In stock', 'PCB Design Guide', 0),
(10, 'Voltage Regulators', 'Regulator datasheet', 'Electronic Components', 0, 'In stock', 'Regulator Usage Guide', 0),
(11, 'Heat Sinks', 'Heat Sink datasheet', 'Electronic Components', 0, 'In stock', 'Heat Sink Installation Guide', 0),
(12, 'Test Probes', 'Test Probe datasheet', 'Test Equipment', 0, 'In stock', 'Test Probe Guide', 0),
(13, 'Wire Connectors', 'Connectors datasheet', 'Electronic Components', 0, 'In stock', 'Connector Guide', 0),
(14, 'Safety Gloves', 'Gloves datasheet', 'Safety Equipment', 0, 'In stock', 'Glove Safety Guide', 0),
(15, 'Cable Ties', 'Cable Tie datasheet', 'Cable Management', 0, 'In stock', 'Cable Tie Guide', 0),
(16, 'Digital Multimeter', 'Multimeter datasheet', 'Test Equipment', 0, 'In stock', 'Multimeter Guide', 0),
(17, 'Arduino Starter Kit', 'Arduino Kit datasheet', 'Microcontroller Kits', 0, 'In stock', 'Arduino Kit Guide', 0),
(18, '3D Printer Filament', 'Filament datasheet', '3D Printing Materials', 0, 'In stock', 'Filament Guide', 0),
(19, 'Calipers', 'Calipers datasheet', 'Measuring Tools', 0, 'In stock', 'Caliper Guide', 0),
(20, 'Bench Vise', 'Vise datasheet', 'Workholding Tools', 0, 'In stock', 'Vise Guide', 0);


INSERT INTO Non_Consumable (nc_id, name, inventory_count, category, training, guide, hidden)
VALUES
(1, 'CNC Router A', 3, 'CNC Machines', 'CNC Operation', 'CNC Router Manual', 0),
(2, '3D Printer X', 2, '3D Printers', '3D Printing Operation', '3D Printer Manual', 0),
(3, 'Laser Cutter 1', 1, 'Laser Cutters', 'Laser Cutting Operation', 'Laser Cutter Manual', 0),
(4, 'Digital Oscilloscope', 4, 'Test Equipment', 'Basic Operation', 'Oscilloscope Manual', 0),
(5, 'Drill Press', 3, 'Machining Tools', 'Drilling Techniques', 'Drill Press Manual', 0),
(6, 'Heat Gun', 5, 'Heat Tools', 'Heat Gun Operation', 'Heat Gun Manual', 0),
(7, 'Breadboard', 10, 'Prototyping Tools', 'Circuit Building', 'Breadboard Guide', 0),
(8, 'Vinyl Cutter', 2, 'Vinyl Cutters', 'Vinyl Cutting Operation', 'Vinyl Cutter Manual', 0),
(9, 'CAD Workstation', 4, 'Computer Workstations', 'CAD Software', 'CAD Workstation Manual', 0),
(10, 'Sanding Machine', 3, 'Finishing Tools', 'Sanding Techniques', 'Sanding Machine Manual', 0),
(11, 'Robotic Arm', 1, 'Robotic Arms', 'Robotic Arm Operation', 'Robotic Arm Manual', 0),
(12, 'CNC Milling Machine', 2, 'Milling Machines', 'Milling Operation', 'Milling Machine Manual', 0),
(13, 'Welding Robot', 2, 'Welding Robots', 'Welding Operation', 'Welding Robot Manual', 0),
(14, 'Injection Molding Machine', 1, 'Molding Machines', 'Molding Operation', 'Molding Machine Manual', 0),
(15, 'Lathes', 3, 'Lathe Machines', 'Lathe Operation', 'Lathe Manual', 0),
(16, '3D Scanner', 2, '3D Scanners', 'Scanning Techniques', '3D Scanner Manual', 0),
(17, 'Plasma Cutter', 1, 'Plasma Cutters', 'Plasma Cutting Operation', 'Plasma Cutter Manual', 0),
(18, 'Large Format 3D Printer', 1, '3D Printers', '3D Printing Operation', '3D Printer Manual', 0),
(19, 'Surface Grinder', 2, 'Grinders', 'Grinding Techniques', 'Surface Grinder Manual', 0),
(20, 'CNC Wire EDM Machine', 1, 'Wire EDM Machines', 'Wire EDM Operation', 'Wire EDM Manual', 0);


INSERT INTO Machine (m_id, name, functional, training, guide)
VALUES
(1, 'CNC Router A', 1, 'CNC Operation', 'CNC Router Manual'),
(2, '3D Printer X', 1, '3D Printing Operation', '3D Printer Manual'),
(3, 'Laser Cutter 1', 1, 'Laser Cutting Operation', 'Laser Cutter Manual'),
(4, 'Digital Oscilloscope', 1, 'Basic Operation', 'Oscilloscope Manual'),
(5, 'Drill Press', 1, 'Drilling Techniques', 'Drill Press Manual'),
(6, 'Heat Gun', 1, 'Heat Gun Operation', 'Heat Gun Manual'),
(7, 'Breadboard', 1, 'Circuit Building', 'Breadboard Guide'),
(8, 'Vinyl Cutter', 0, 'Vinyl Cutting Operation', 'Vinyl Cutter Manual'),
(9, 'CAD Workstation', 1, 'CAD Software', 'CAD Workstation Manual'),
(10, 'Sanding Machine', 1, 'Sanding Techniques', 'Sanding Machine Manual'),
(11, 'Robotic Arm', 1, 'Robotic Arm Operation', 'Robotic Arm Manual'),
(12, 'CNC Milling Machine', 1, 'Milling Operation', 'Milling Machine Manual'),
(13, 'Welding Robot', 1, 'Welding Operation', 'Welding Robot Manual'),
(14, 'Injection Molding Machine', 1, 'Molding Operation', 'Molding Machine Manual'),
(15, 'Lathes', 1, 'Lathe Operation', 'Lathe Manual'),
(16, '3D Scanner', 1, 'Scanning Techniques', '3D Scanner Manual'),
(17, 'Plasma Cutter', 0, 'Plasma Cutting Operation', 'Plasma Cutter Manual'),
(18, 'Large Format 3D Printer', 1, '3D Printing Operation', '3D Printer Manual'),
(19, 'Surface Grinder', 1, 'Grinding Techniques', 'Surface Grinder Manual'),
(20, 'CNC Wire EDM Machine', 0, 'Wire EDM Operation', 'Wire EDM Manual');


INSERT INTO Room (r_id, building, number, capacity)
VALUES
(1, 'Engineering Building', 101, 30),
(2, 'Design Studio', 202, 20),
(3, 'Prototyping Lab', 303, 15);


INSERT INTO Storage_Medium (sm_id, name, type, parent_id)
VALUES
(1, 'Tool Cabinet', 'Cabinet', NULL),
(2, 'Component Shelf', 'Shelf', NULL),
(3, 'Electronics Drawer', 'Drawer', NULL),
(4, 'Material Rack', 'Rack', NULL),
(5, 'Equipment Cart', 'Cart', NULL);


INSERT INTO Consumable_Location (c_id, r_id, sm_id)
VALUES
(1, 1, 1),
(2, 1, 1),
(3, 2, 2),
(4, 2, 3),
(5, 2, 1),
(6, 1, 4),
(7, 3, 2),
(8, 3, 1),
(9, 2, 5),
(10, 1, 2),
(11, 3, 4),
(12, 1, 3),
(13, 2, 5),
(14, 3, 3),
(15, 1, 2),
(16, 3, 5),
(17, 1, 4),
(18, 2, 1),
(19, 1, 5),
(20, 3, 1);




INSERT INTO Non_Consumable_Location (nc_id, r_id, sm_id)
VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 3),
(5, 2, 2),
(6, 1, 3),
(7, 3, 2),
(8, 3, 1),
(9, 2, 5),
(10, 1, 2),
(11, 3, 4),
(12, 1, 4),
(13, 2, 5),
(14, 3, 3),
(15, 1, 2),
(16, 3, 5),
(17, 1, 1),
(18, 2, 3),
(19, 1, 5),
(20, 3, 1);




INSERT INTO Machine_Location (m_id, r_id, sm_id)
VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 3),
(5, 2, 2),
(6, 1, 3),
(7, 3, 2),
(8, 3, 1),
(9, 2, 5),
(10, 1, 2),
(11, 3, 4),
(12, 1, 4),
(13, 2, 5),
(14, 3, 3),
(15, 1, 2),
(16, 3, 5),
(17, 1, 1),
(18, 2, 3),
(19, 1, 5),
(20, 3, 1);
