import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, Plus, Search } from 'lucide-react';
import API from '../services/api';
import { Navbar } from '../components/Navbar';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
const fetchTasks = async (filters) => {
 const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
 const { data } = await API.get('/tasks', { params });
 return data;
};
export const DashboardPage = () => {
 const queryClient = useQueryClient();
 const [filters, setFilters] = useState({
 page: 1,
 limit: 9,
 status: '',
 priority: '',
 search: '',
 sortBy: 'createdAt',
 order: 'desc',
 });
 const [modalTask, setModalTask] = useState(undefined); // undefined = closed, null = new, object = edit
 const { data, isLoading, isError } = useQuery({
 queryKey: ['tasks', filters],
 queryFn: () => fetchTasks(filters),
 });
 const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tasks'] });
const createMutation = useMutation({
  mutationFn: (formData) => API.post('/tasks', formData),

  onSuccess: () => {
    invalidate();
    setModalTask(undefined);
  },
});
 const updateMutation = useMutation({
 mutationFn: ({ id, formData }) => API.put(`/tasks/${id}`, formData),
 onSuccess: () => {
 invalidate();
 setModalTask(undefined);
 },
 });
 const deleteMutation = useMutation({
 mutationFn: (id) => API.delete(`/tasks/${id}`),
 onSuccess: invalidate,
 });
 const handleFilterChange = (key, value) => {
 setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
 };
 const toggleOrder = () => {
 setFilters((prev) => ({ ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' }));
 };
 const handleSubmit = (formData) => {
 if (modalTask) {
 updateMutation.mutate({ id: modalTask._id, formData });
 } else {
 createMutation.mutate(formData);
 }
 };
 const handleDelete = (task) => {
 if (window.confirm(`Delete "${task.title}"?`)) {
 deleteMutation.mutate(task._id);
 }
 };
 const tasks = data?.data || [];
 const meta = data?.meta;
 return (
 <div className="min-h-screen">
 <Navbar />
 <main className="max-w-5xl mx-auto px-4 py-6">
 <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
 <h1 className="text-xl font-semibold">My Tasks</h1>
 <button
 onClick={() => setModalTask(null)}
 className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg
text-sm font-medium hover:bg-indigo-700"
 >
 <Plus className="w-4 h-4" /> New Task
 </button>
 </div>
 <div className="flex flex-wrap gap-3 mb-6">
 <div className="relative flex-1 min-w-[200px]">
 <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
 <input
 value={filters.search}
 onChange={(e) => handleFilterChange('search', e.target.value)}
 placeholder="Search tasks..."
 className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm"
 />
 </div>
 <select
 value={filters.status}
 onChange={(e) => handleFilterChange('status', e.target.value)}
 className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
 >
 <option value="">All statuses</option>
 <option value="PENDING">Pending</option>
 <option value="IN_PROGRESS">In Progress</option>
 <option value="DONE">Done</option>
 </select>
 <select
 value={filters.priority}
 onChange={(e) => handleFilterChange('priority', e.target.value)}
 className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
 >
 <option value="">All priorities</option>
 <option value="LOW">Low</option>
 <option value="MEDIUM">Medium</option>
 <option value="HIGH">High</option>
 </select>
 <select
 value={filters.sortBy}
 onChange={(e) => handleFilterChange('sortBy', e.target.value)}
 className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
 >
 <option value="createdAt">Sort: Created</option>
 <option value="dueDate">Sort: Due Date</option>
 <option value="priority">Sort: Priority</option>
 <option value="title">Sort: Title</option>
 </select>
 <button
 onClick={toggleOrder}
 title={filters.order === 'asc' ? 'Ascending' : 'Descending'}
 className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2
text-sm text-gray-600 hover:bg-gray-50"
 >
 {filters.order === 'asc' ? (
 <ArrowUp className="w-4 h-4" />
 ) : (
 <ArrowDown className="w-4 h-4" />
 )}
 </button>
 </div>
 {isLoading && <p className="text-gray-500 text-sm">Loading tasks...</p>}
 {isError && <p className="text-red-600 text-sm">Failed to load tasks.</p>}
 {!isLoading && tasks.length === 0 && (
 <p className="text-gray-500 text-sm">No tasks found. Create one to get started.</p>
 )}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {tasks.map((task) => (
 <TaskCard
 key={task._id}
 task={task}
 onEdit={setModalTask}
 onDelete={handleDelete}
 />
 ))}
 </div>
 {meta && meta.lastPage > 1 && (
 <div className="flex items-center justify-center gap-3 mt-8 text-sm">
 <button
 disabled={filters.page <= 1}
 onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
 className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40"
 >
 Previous
 </button>
 <span>
 Page {meta.page} of {meta.lastPage}
 </span>
 <button
 disabled={filters.page >= meta.lastPage}
 onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
 className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40"
 >
 Next
 </button>
 </div>
 )}
 </main>
 {modalTask !== undefined && (
 <TaskFormModal
 task={modalTask}
 onClose={() => setModalTask(undefined)}
 onSubmit={handleSubmit}
 isSubmitting={createMutation.isPending || updateMutation.isPending}
 />
 )}
 </div>
 );
};
