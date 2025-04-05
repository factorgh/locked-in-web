import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Pencil, Plus, ToggleLeft, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PoliticalContent as PoliticalContentType } from '../../types';
import toast from 'react-hot-toast';

const AdminPoliticalContent = () => {
  const { politicalContent, addPoliticalContent, updatePoliticalContent, deletePoliticalContent, togglePoliticalContentActive } = useAdmin();
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [currentContent, setCurrentContent] = useState<PoliticalContentType | null>(null);
  const [newContent, setNewContent] = useState<Omit<PoliticalContentType, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    mediaType: 'none',
    mediaUrl: '',
    active: true
  });

  const handleAddContent = () => {
    if (!newContent.title || !newContent.content) {
      toast.error('Title and content are required');
      return;
    }
    
    if ((newContent.mediaType === 'image' || newContent.mediaType === 'video') && !newContent.mediaUrl) {
      toast.error('Media URL is required when media type is selected');
      return;
    }
    
    addPoliticalContent(newContent);
    setNewContent({
      title: '',
      content: '',
      mediaType: 'none',
      mediaUrl: '',
      active: true
    });
    setIsAddingContent(false);
  };

  const handleUpdateContent = () => {
    if (!currentContent) return;
    
    if (!currentContent.title || !currentContent.content) {
      toast.error('Title and content are required');
      return;
    }
    
    if ((currentContent.mediaType === 'image' || currentContent.mediaType === 'video') && !currentContent.mediaUrl) {
      toast.error('Media URL is required when media type is selected');
      return;
    }
    
    updatePoliticalContent(currentContent);
    setCurrentContent(null);
    setIsEditingContent(false);
  };

  const handleEditClick = (content: PoliticalContentType) => {
    setCurrentContent(content);
    setIsEditingContent(true);
  };

  const handleDeleteClick = (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deletePoliticalContent(contentId);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isEditing: boolean
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    if (isEditing && currentContent) {
      setCurrentContent({
        ...currentContent,
        [name]: type === 'checkbox' ? checked : value,
      });
    } else {
      setNewContent({
        ...newContent,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center">
          <Link to="/admin" className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Manage Political Content
          </h1>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setIsAddingContent(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-1" /> Add Content
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        {politicalContent.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p className="mb-4">No political content has been added yet.</p>
            <button
              onClick={() => setIsAddingContent(true)}
              className="text-pink-600 hover:underline inline-flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add your first content
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Media Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {politicalContent.map((content) => (
                  <tr key={content.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {content.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.mediaType === 'none' ? 'Text Only' : 
                       content.mediaType === 'image' ? 'Image' : 'Video'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(content.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          content.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {content.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => togglePoliticalContentActive(content.id)}
                        className="text-gray-600 hover:text-gray-900 mr-4"
                        title={content.active ? 'Deactivate' : 'Activate'}
                      >
                        <ToggleLeft size={18} />
                      </button>
                      <button
                        onClick={() => handleEditClick(content)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(content.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Content Preview */}
      {politicalContent.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Active Content Preview</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {politicalContent.filter(c => c.active).length === 0 ? (
              <p className="text-gray-500 text-center">No active content to display</p>
            ) : (
              politicalContent
                .filter(c => c.active)
                .map((content) => (
                  <div key={content.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                    <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                    <div className="text-gray-700 mb-4">
                      {content.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                    {content.mediaType !== 'none' && content.mediaUrl && (
                      <div className="mt-4">
                        {content.mediaType === 'image' ? (
                          <img 
                            src={content.mediaUrl} 
                            alt={content.title} 
                            className="max-w-full h-auto max-h-[200px] object-cover rounded-md"
                          />
                        ) : (
                          <div className="aspect-w-16 aspect-h-9">
                            <iframe
                              src={content.mediaUrl}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-[200px] rounded-md"
                              title={content.title}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Add Content Modal */}
      <AnimatePresence>
        {isAddingContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-xl font-semibold mb-4">Add Political Content</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddContent(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newContent.title}
                    onChange={(e) => handleInputChange(e, false)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={newContent.content}
                    onChange={(e) => handleInputChange(e, false)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    rows={6}
                    required
                    placeholder="Enter your political statement or content here..."
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Media Type
                  </label>
                  <select
                    name="mediaType"
                    value={newContent.mediaType}
                    onChange={(e) => handleInputChange(e, false)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  >
                    <option value="none">No Media</option>
                    <option value="image">Image</option>
                    <option value="video">Video (YouTube/Vimeo)</option>
                  </select>
                </div>
                
                {newContent.mediaType !== 'none' && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      {newContent.mediaType === 'image' ? 'Image URL *' : 'Video Embed URL *'}
                    </label>
                    <input
                      type="text"
                      name="mediaUrl"
                      value={newContent.mediaUrl}
                      onChange={(e) => handleInputChange(e, false)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                      placeholder={newContent.mediaType === 'image' 
                        ? 'https://example.com/image.jpg' 
                        : 'https://www.youtube.com/embed/VIDEO_ID'
                      }
                      required={newContent.mediaType !== 'none'}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {newContent.mediaType === 'image' 
                        ? 'Direct link to image file (JPG, PNG, etc.)' 
                        : 'Use the embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)'
                      }
                    </p>
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="active"
                      checked={newContent.active}
                      onChange={(e) => handleInputChange(e, false)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Show on website (active)</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingContent(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Add Content
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Content Modal */}
      <AnimatePresence>
        {isEditingContent && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-xl font-semibold mb-4">Edit Political Content</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateContent(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentContent.title}
                    onChange={(e) => handleInputChange(e, true)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={currentContent.content}
                    onChange={(e) => handleInputChange(e, true)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Media Type
                  </label>
                  <select
                    name="mediaType"
                    value={currentContent.mediaType}
                    onChange={(e) => handleInputChange(e, true)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  >
                    <option value="none">No Media</option>
                    <option value="image">Image</option>
                    <option value="video">Video (YouTube/Vimeo)</option>
                  </select>
                </div>
                
                {currentContent.mediaType !== 'none' && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      {currentContent.mediaType === 'image' ? 'Image URL *' : 'Video Embed URL *'}
                    </label>
                    <input
                      type="text"
                      name="mediaUrl"
                      value={currentContent.mediaUrl || ''}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                      required={currentContent.mediaType !== 'none'}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {currentContent.mediaType === 'image' 
                        ? 'Direct link to image file (JPG, PNG, etc.)' 
                        : 'Use the embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)'
                      }
                    </p>
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="active"
                      checked={currentContent.active}
                      onChange={(e) => handleInputChange(e, true)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Show on website (active)</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => { setIsEditingContent(false); setCurrentContent(null); }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Update Content
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPoliticalContent;
