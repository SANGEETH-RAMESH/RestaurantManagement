

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  restaurantName?: string;
}

const DeleteConfirmDialog = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  restaurantName = "this restaurant" 
}: DeleteConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7m0 0a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Delete Restaurant</h2>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{restaurantName}</span>?
          </p>
          <p className="text-sm text-gray-500">
            This action cannot be undone. All associated data will be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;