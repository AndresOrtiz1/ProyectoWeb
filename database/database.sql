CREATE DATABASE inventarios_productos_db;
USE inventarios_productos_db;
/* La tabla debe cambiar al que le toco esta parte a su conveniencia*/

CREATE TABLE productos (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  descripcion varchar(255) NOT NULL,
  precio decimal(10,2) NOT NULL,
  cantidad int(11) NOT NULL,
  fecha_creacion datetime NOT NULL,
  fecha_actualizacion datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- tabla de datos de materia prima
CREATE TABLE materia_prima (
  id int NOT NULL AUTO_INCREMENT,
  codigo varchar(255) NOT NULL,
  nombre varchar(255) NOT NULL,
  precio varchar(255) NOT NULL,
  unidad_medida varchar(255) NOT NULL,
  cantidad varchar(255) NOT NULL,
  fecha_ingreso varchar(255) NOT NULL,
  fecha_caducidad varchar(255) NOT NULL,
  imagen longtext NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- base de datos de proveedores
CREATE TABLE proveedores (
  id int(11) NOT NULL AUTO_INCREMENT,
  codigo varchar(255) NOT NULL,
  NombreApellido varchar(255) NOT NULL,
  Cedula varchar(255) NOT NULL,
  NumeroCelular varchar(255) NOT NULL,
  CorreoElectronico varchar(255) NOT NULL,
  Direccion varchar(255) NOT NULL,
  NombreEmpresa varchar(255) NOT NULL,
  TelefonoEmpresa varchar(255) NOT NULL,
  DireccionEmpresa varchar(255) NOT NULL,
  CorreoEmpresa varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;
--base de datos clientes

CREATE TABLE clientes (
  id int(11) NOT NULL AUTO_INCREMENT,
  cedulaCliente varchar(255) NOT NULL,
  nombresCliente varchar(255) NOT NULL,
  apellidosCliente varchar(255) NOT NULL,
  correoCliente varchar(255) NOT NULL,
  edadCliente varchar(255) NOT NULL,
  direccionCliente varchar(255) NOT NULL,
  telefonoCliente varchar(255) NOT NULL,  
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- tabla producto terminado
CREATE TABLE producto_terminado (
  id int(11) NOT NULL AUTO_INCREMENT, 
  codigo varchar(255) NOT NULL,
  costo_terminado varchar(255) NOT NULL,
  cantidad_terminado varchar(255) NOT NULL,
  receta varchar(255) NOT NULL,
  imagen longtext NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
