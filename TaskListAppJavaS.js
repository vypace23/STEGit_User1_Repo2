import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";

export default function TaskListApp() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: "Nueva Tarea",
      description: "Descripción de la tarea",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      dueDate: "",
      priority: "Media",
    };
    setTasks([...tasks, newTask]);
  };

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    setEditMode(false);
    setShowDialog(true);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setShowDialog(false);
  };

  const editTask = () => {
    setEditMode(true);
  };

  const saveTask = () => {
    setTasks(tasks.map(task => (task.id === selectedTask.id ? selectedTask : task)));
    setEditMode(false);
  };

  const filteredTasks = tasks.filter(task => 
    (filterPriority !== "All" ? task.priority === filterPriority : true) &&
    (filterDate ? task.startDate === filterDate : true)
  );

  return (
    <div className="p-4">
      <Button onClick={addTask}>Agregar Tarea</Button>
      <div className="flex gap-4 mt-4">
        <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <SelectContent>
            <SelectItem value="All">Todas</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Baja">Baja</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </div>
      <div className="grid gap-4 mt-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="p-4 cursor-pointer" onClick={() => openTaskDetail(task)}>
            <CardContent>
              <h3 className="text-lg font-bold">{task.name}</h3>
              <p>Prioridad: {task.priority}</p>
              <p>Fecha de inicio: {task.startDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showDialog && selectedTask && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            {editMode ? (
              <>
                <DialogTitle>Editar Tarea</DialogTitle>
                <Input value={selectedTask.name} onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })} />
                <Textarea value={selectedTask.description} onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} />
                <Input type="date" value={selectedTask.startDate} onChange={(e) => setSelectedTask({ ...selectedTask, startDate: e.target.value })} />
                <Input type="date" value={selectedTask.endDate} onChange={(e) => setSelectedTask({ ...selectedTask, endDate: e.target.value })} />
                <Input type="date" value={selectedTask.dueDate} onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })} />
                <Select value={selectedTask.priority} onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={saveTask}>Guardar</Button>
              </>
            ) : (
              <>
                <DialogTitle>{selectedTask.name}</DialogTitle>
                <p>{selectedTask.description}</p>
                <p>Prioridad: {selectedTask.priority}</p>
                <p>Fecha de inicio: {selectedTask.startDate}</p>
                <p>Fecha de fin: {selectedTask.endDate || "No definida"}</p>
                <p>Fecha de vencimiento: {selectedTask.dueDate || "No definida"}</p>
                <Button onClick={editTask}>Editar</Button>
                <Button onClick={() => deleteTask(selectedTask.id)}>Eliminar</Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
