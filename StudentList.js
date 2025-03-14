class Alumno:
    def __init__(self, nombre, apellido, cursos=None):
        self.nombre = nombre
        self.apellido = apellido
        self.cursos = cursos if cursos else []
    
    def agregar_curso(self, curso):
        if curso not in self.cursos:
            self.cursos.append(curso)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} - Cursos: {', '.join(self.cursos) if self.cursos else 'Ninguno'}"

class GestionAlumnos:
    def __init__(self):
        self.alumnos = []
    
    def agregar_alumno(self, nombre, apellido, cursos=None):
        alumno = Alumno(nombre, apellido, cursos)
        self.alumnos.append(alumno)
    
    def eliminar_alumno(self, nombre, apellido):
        self.alumnos = [alumno for alumno in self.alumnos if alumno.nombre != nombre or alumno.apellido != apellido]
    
    def buscar_alumno(self, nombre, apellido):
        for alumno in self.alumnos:
            if alumno.nombre == nombre and alumno.apellido == apellido:
                return alumno
        return None
    
    def listar_alumnos(self):
        if not self.alumnos:
            print("No hay alumnos registrados.")
        else:
            for alumno in self.alumnos:
                print(alumno)

# Ejemplo de uso
gestion = GestionAlumnos()
gestion.agregar_alumno("Juan", "Perez", ["Matemáticas", "Historia"])
gestion.agregar_alumno("Maria", "Lopez", ["Ciencias", "Inglés"])
gestion.listar_alumnos()

encontrado = gestion.buscar_alumno("Juan", "Perez")
if encontrado:
    print("Alumno encontrado:", encontrado)
gestion.eliminar_alumno("Maria", "Lopez")
gestion.listar_alumnos()
