import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileUpload } from '../FileUpload';

describe('FileUpload', () => {
  // Success case - User can upload a valid file
  it('should handle successful file upload', async () => {
    const mockOnUpload = vi.fn().mockResolvedValue(undefined);
    render(<FileUpload onUpload={mockOnUpload} isUploading={false} />);

    const file = new File(['test content'], 'test.md', {
      type: 'text/markdown',
    });
    const input = screen.getByLabelText(/drag & drop a file here/i);

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockOnUpload).toHaveBeenCalledWith(file);
    });
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  // Edge case - User can see upload state changes
  it('should show loading state when uploading', () => {
    render(<FileUpload onUpload={vi.fn()} isUploading={true} />);

    expect(screen.getByText('Uploading...')).toBeTruthy();
    expect(screen.queryByText(/drag & drop a file here/i)).toBeNull();
  });
});
