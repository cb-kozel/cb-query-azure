import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FileUploadResponse {
  id: string;
  filename: string;
  document_type: 'executive_overview' | 'technical_spec';
  url: string;
  created_at: string;
}

export const uploadFile = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<FileUploadResponse>(
    '/files/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const queryDocument = async (
  query: string,
  documentId: string
): Promise<string> => {
  const response = await api.post<{ answer: string }>('/query', {
    query,
    document_id: documentId,
  });

  return response.data.answer;
};
