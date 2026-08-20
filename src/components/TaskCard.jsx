import React from 'react';
import { MapPin, Paperclip, Pencil, Trash2 } from 'lucide-react';
import { WeatherBadge } from './WeatherBadge';
const statusStyles = {
 DONE: 'bg-green-100 text-green-700',
 IN_PROGRESS: 'bg-blue-100 text-blue-700',
 PENDING: 'bg-yellow-100 text-yellow-700',
};
const priorityStyles = {
 HIGH: 'bg-red-50 text-red-600',
 MEDIUM: 'bg-orange-50 text-orange-600',
 LOW: 'bg-gray-100 text-gray-600',
};
export const TaskCard = ({ task, onEdit, onDelete }) => {
   console.log('task.weather:', task.weather);
 return (
 <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md
transition">
 <div className="flex justify-between items-start mb-3 gap-2">
 <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
 <span className={`px-2.5 py-1 text-xs rounded-full font-medium
${statusStyles[task.status]}`}>
 {task.status}
 </span>
 </div>
 {task.description && (
 <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
 )}
 <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
 <span className={`px-2.5 py-1 rounded font-medium ${priorityStyles[task.priority]}`}>
 {task.priority}
 </span>
 {task.dueDate && (
 <span className="bg-gray-100 px-2.5 py-1 rounded">
 Due {new Date(task.dueDate).toLocaleDateString()}
 </span>
 )}
 {task.location && (
 <div className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded">
 <MapPin className="w-3.5 h-3.5 text-red-500" />
 <span>{task.location}</span>
 </div>
 )}
 <WeatherBadge weather={task.weather} />
 
 {task.fileUrl && (
    <a
 href={task.fileUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-1 text-indigo-600 hover:underline px-2.5 py-1 bg-indigo-50 rounded"
 >
 <Paperclip className="w-3.5 h-3.5" />
 <span>Attachment</span>
 </a>
 )}
 </div>
 <div className="flex gap-3 text-sm">
 <button
 onClick={() => onEdit(task)}
 className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
 >
 <Pencil className="w-3.5 h-3.5" /> Edit
 </button>
 <button
 onClick={() => onDelete(task)}
 className="flex items-center gap-1 text-gray-600 hover:text-red-600"
 >
 <Trash2 className="w-3.5 h-3.5" /> Delete
 </button>
 </div>
 </div>
 );
};
