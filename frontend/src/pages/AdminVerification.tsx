import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

const AdminVerification = () => {
  const [passportFront, setPassportFront] = useState<File | null>(null);
  const [passportBack, setPassportBack] = useState<File | null>(null);
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleVerify = async () => {
    if (!passportFront || !passportBack || !idFront || !idBack) {
      setError("Please upload all four documents (both sides of Passport and ID)");
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('passportFront', passportFront);
    formData.append('passportBack', passportBack);
    formData.append('idFront', idFront);
    formData.append('idBack', idBack);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/admin/verify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        // Save the verification token from backend
        localStorage.setItem(`admin_verification_token_${user.id}`, response.data.token);

        setSuccess(true);

        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
          <Shield className="mx-auto mb-4" size={56} />
          <h1 className="text-3xl font-bold">Admin Verification</h1>
          <p className="mt-2 opacity-90">Secure access for Administrator</p>
        </div>

        <div className="p-8">
          {!success ? (
            <>
              <p className="text-gray-600 mb-8 text-center">
                Upload both sides of your Passport and National ID to continue
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport (Front)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setPassportFront)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {passportFront && <p className="text-green-600 text-xs mt-1">✓ {passportFront.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport (Back)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setPassportBack)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {passportBack && <p className="text-green-600 text-xs mt-1">✓ {passportBack.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">National ID (Front)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setIdFront)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {idFront && <p className="text-green-600 text-xs mt-1">✓ {idFront.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">National ID (Back)</label>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange(e, setIdBack)} 
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3" 
                  />
                  {idBack && <p className="text-green-600 text-xs mt-1">✓ {idBack.name}</p>}
                </div>
              </div>

              {error && <p className="text-red-600 text-center mt-4">{error}</p>}

              <button
                onClick={handleVerify}
                disabled={uploading}
                className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                {uploading ? "Verifying..." : "Verify & Generate Token"}
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
              <h3 className="text-2xl font-semibold text-green-600">Verification Successful</h3>
              <p className="text-gray-600 mt-3">Redirecting to Admin Dashboard...</p>
            </div>
          )}
        </div>

        <div className="border-t p-4 text-center">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;