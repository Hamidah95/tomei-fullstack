"use client";
import axios from "axios";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { API } from "./services/todos.service";
import { initialTaskValues, taskStatuses } from "./utils/constants";
import { TodoPayload, TodoProps } from "./utils/interfaces";
import Button from "./components/Button";


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    const data = res.data;
    setTodos(data);
  }

  const addTodoApi = async ({ title, description, status }: TodoPayload) => {
    if (!title) return;
    await axios.post(API, { title, description, status });
    fetchTodos();
  }
  const deleteTodo = async (id: number) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  }

  const updateTodo = async ({ id, title, description, status }: TodoPayload) => {
    await axios.put(`${API}/${id}`, { title, description, status });
    fetchTodos();
  }

  const applyFilter = (status: string) => {
    setFilterStatus(status);
    if (status === 'ALL') {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo: { status: string }) => todo.status === status);
      setFilteredTodos(filtered);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    applyFilter(filterStatus);
  }, [todos]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 style={{fontWeight:'bold', textDecorationLine:'underline'}}>Personal Task Tracker</h1>

        <Formik
          initialValues={initialTaskValues}
          validate={values => {
            const errors: Record<string, string> = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addTodoApi(values);
            resetForm();
            setSubmitting(false);
          }
          }
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Title"
                value={values.title}
                autoCorrect="off"
                className="border p-2 rounded w-full mb-4"
              />
              {errors.title && touched.title && errors.title}
              <textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Description"
                value={values.description}
                autoCorrect="off"
                className="border p-2 rounded w-full mb-4"
              />
              {errors.description && touched.description && errors.description}
              <p className="mb-4">Status:</p>
              {taskStatuses.map((item) => (
                <div key={item} className="mb-4">
                  <Field
                    type="radio"
                    name="status"
                    value={item}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  /> {item}
                  <br />
                </div>
              ))}
              <Button title="Add Task" onClick={handleSubmit} type="submit" disabled={isSubmitting} />
            </form>
          )}
        </Formik>

        <select onChange={(e) => applyFilter(e.target.value)} className="mb-4 p-2 border rounded">
          <option value="ALL">All</option>
          {taskStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <ul className="w-full">
          {filteredTodos.map(({ id, title, description, status, created_at }: TodoProps) => (
            <li key={id} className="flex items-center justify-between mb-2 border p-2 rounded">
              {editingId === id ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  updateTodo({
                    id,
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    status: formData.get('status') as string
                  });
                  setEditingId(null);
                }}>
                  <input type="text" name="title" defaultValue={title} className="border p-1 rounded mb-2 w-full" />
                  <textarea name="description" defaultValue={description} className="border p-1 rounded mb-2 w-full" />
                  <select name="status" defaultValue={status} className="border p-1 rounded mb-2 w-full">
                    {taskStatuses.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <Button title="Save" type="submit" onClick={() => { }} />
                  <Button title="Cancel" onClick={() => setEditingId(null)} style={{ marginLeft: 10 }} />
                </form>
              ) : (
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p>{description}</p>
                  <p>Status: {status}</p>
                  <p>Created At: {new Date(created_at).toLocaleString()}</p>
                  <Button title="Edit" onClick={() => setEditingId(id)} style={{ marginRight: 20 }} />
                  <Button title="Delete" onClick={() => deleteTodo(id)} style={{ backgroundColor: 'red' }} />

                </div>
              )}

            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}
