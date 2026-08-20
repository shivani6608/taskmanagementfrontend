import React, { useState } from 'react';
import { X } from 'lucide-react';
const emptyForm = {
 title: '',
 description: '',
 status: 'PENDING',
 priority: 'MEDIUM',
 dueDate: '',
 location: '',
};
export const TaskFormModal = ({ task, onClose, onSubmit, isSubmitting }) => {
 const [form, setForm] = useState(() =>
 task
 ? {
 title: task.title || '',
 description: task.description || '',
 status: task.status || 'PENDING',
 priority: task.priority || 'MEDIUM',
 dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
 location: task.location || '',
 }
 : emptyForm
 );
 const [file, setFile] = useState(null);
 const handleChange = (e) => {
 setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };
 const handleSubmit = (e) => {
 e.preventDefault();
 const formData = new FormData();
 Object.entries(form).forEach(([key, value]) => formData.append(key, value));
 if (file) formData.append('file', file);
 onSubmit(formData);
 };
 return (
 <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
 <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:textgray-600">
 <X className="w-5 h-5" />
 </button>
 <h2 className="text-lg font-semibold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>
 <form onSubmit={handleSubmit} className="space-y-3">
 <input
 name="title"
 value={form.title}
 onChange={handleChange}
 placeholder="Title"
 required
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <textarea
 name="description"
 value={form.description}
 onChange={handleChange}
 placeholder="Description"
 rows={3}
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <div className="grid grid-cols-2 gap-3">
 <select
 name="status"
 value={form.status}
 onChange={handleChange}
 className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
 >
 <option value="PENDING">Pending</option>
 <option value="IN_PROGRESS">In Progress</option>
 <option value="DONE">Done</option>
 </select>
 <select
 name="priority"
 value={form.priority}
 onChange={handleChange}
 className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
 >
 <option value="LOW">Low</option>
 <option value="MEDIUM">Medium</option>
 <option value="HIGH">High</option>
 </select>
 </div>
 <input
 type="date"
 name="dueDate"
 value={form.dueDate}
 onChange={handleChange}
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <input
 name="location"
 value={form.location}
 onChange={handleChange}
 placeholder="Location (city)"
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <input
type="file"
 onChange={(e) => setFile(e.target.files?.[0] || null)}
 className="w-full text-sm"
 />
 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium
hover:bg-indigo-700 disabled:opacity-50"
 >
 {isSubmitting ? 'Saving...' : task ? 'Save Changes' : 'Create Task'}
 </button>
 </form>
 </div>
 </div>
 );
};
