CREATE DATABASE nys_history;

CREATE TABLE nys_history.places (
  `name` varchar(64) NOT NULL,
  `county` varchar(64) NOT NULL,
  `registered` varchar(64) NOT NULL,
  `national_number` varchar(64) NOT NULL,
  `lon` varchar(64) NOT NULL,
  `lat` varchar(64) NOT NULL,
  `loc` varchar(64) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6849 DEFAULT CHARSET=latin1;
