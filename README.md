Lockerty
====================

Componentes del Equipo
---------------------

+ Álvaro Quirós López (Desarrollo frontend) @alodev
+ Carlos Carmona Alcántara (Maker y desarrollo) @ccarmona  
+ Oscar Bautista Torres (Diseñador y UX) @chispes
+ Rafael Prats Vieira (Desarrollo backend) @raprav 

Descripción
-------------
Lockerty es el producto que permite aplicar autentificación digital en el mundo físico. Sin necesidad de adaptar las puertas ni cambiar las llaves.

El repositorio alberga tres subproyectos separados en carpetas:

+ arduino: Programa en Node.js para programar un Arduino YUN, comunicandose mediante Socket.IO con los servicios de Lockerty.
+ bluemix: API escrita en Node.js que interactúa con servicios de IBM Bluemix.
+ ionic app: Apps para iOS y Android utilizando Angular.JS e Ionic Framework

Utiliza tus mismas cuentas de internet en la seguridad AFK.


Estado del desarrollo actual
----------------------------
Prototipo funcional. Utiliza OAuth de Facebook para el mantenimiento de sesiones, relacionando usuarios de Facebook con dispositivos (cerrojos).

![Front](http://i.imgur.com/sHfVeaX.jpg)

![Back](http://i.imgur.com/EFEEqRu.jpg)


Especificaciones Técnicas
--------------------------
+ Javascript
+ Cloudant NoSQL
+ IBM Bluemix
+ Arduino YUN

Licencia
---------
GNU-GPL versión 2.
