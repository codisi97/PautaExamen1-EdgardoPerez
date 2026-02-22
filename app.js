const express = require('express');
const app = express();
const PORT =3000;

app.use(express.json());

const libros = [
  { "id": 1, "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "anioPublicacion": 1967, "estado":"disponible" },
  { "id": 2, "titulo": "1984", "autor": "George Orwell", "anioPublicacion": 1949,"estado":"prestado" },
  { "id": 3, "titulo": "Don Quijote de la Mancha", "autor": "Miguel de Cervantes","anioPublicacion": 1605,"estado":"disponible" }
]

app.get('/libros',(req,res)=>{
  res.json({status:200,message:'Success',data:libros});

});


app.post('/libros',(req,res)=>{
  const libroNuevo = req.body;

  if (!libroNuevo.titulo || !libroNuevo.autor || !libroNuevo.anioPublicacion || !libroNuevo.estado || !["disponible","prestado","reservado","daniado"].includes(libroNuevo.estado)) {
    return res.status(400).json({ messsage: 'Se requieren más datos', data: libros});
  }

  const nuevoId = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;
  libroNuevo.id = nuevoId;

  libros.push(libroNuevo);

  res.status(201).json(libroNuevo);

});

app.put('/libros/:id',(req,res)=>{
  const libroActualizado = req.body;
  const id = parseInt(req.params.id);

  let isExists = false;

  libros.forEach(lib =>{
    if(lib.id === id) {
      isExists=true;
      lib.titulo = libroActualizado.titulo;
      lib.autor = libroActualizado.autor;
      lib.anioPublicacion = libroActualizado.anioPublicacion;
      lib.estado = libroActualizado.estado;
    }
  });

  if (isExists) {
    res.status(200).json({status: 200,message: 'Libro actualizado.',data: libroActualizado});
  } else {
    res.status(404).json({status: 404,message: 'Libro no encontrado.'});
  }
  

});


app.listen(PORT,()=>{
  console.log(`El servidor esta escuchando en http://localhost:${PORT}`);

});