import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'
import useUpload from '../hooks/useUpload'

export default function SetupProfile() {

const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);


  const [form, setForm] = useState({
    name: "",
    age: "",
    work: "",
    education: "",
    gender: "",
    hometown: "",
    interests: [],
    foodPreference: ""
  });

    const interestsList = [
    "Sports", "Travel", "Animals/Pets", "Music", "Fashion", "Journaling",
    "Beaches", "Mountains", "Hiking", "Swimming", "Art", "Dancing",
    "Make-up", "Knitting", "Crafts", "Photography", "Writing",
    "Designing", "Cooking", "Eating out", "Bars", "Book Clubs",
    "Cinema/Films", "Social Activism", "Spirituality", "Gaming",
    "Reading", "Smoking"
  ];

    const toggleInterest = (interest) => {
    setForm(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();

    let uploadedImage = null;
    if (image) {
      uploadedImage = await useUpload({
        image,
        onUploadProgress: (e) => {
          const p = Math.round((e.loaded * 100) / e.total);
          setProgress(p);
        }
      });
    }

      const res = await axios.put(
      "http://localhost:5000/api/updateProfile",
      {
        ...form,
        profile: uploadedImage ? uploadedImage.url : form.profile,
        publicId: uploadedImage ? uploadedImage.public_id : null
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      }
    );
    
      if (res.data.success) {
        toast.success("Profile updated");
        navigate("/profile");
      } else {
        toast.error(res.data.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return  (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold">Complete your profile</h2>


      <form onSubmit={handleSubmit} className="space-y-4 mt-4">

        <div className="flex flex-col">
  <label className="text-gray-800 font-medium mb-1">Profile Photo</label>

  <input
    type="file"
    id="profile"
    accept="image/*"
    onChange={(e)=> {
      const file = e.target.files[0];
      if(file.size > 1000000){
        toast.error("Image must be < 1MB");
        return;
      }
      setImage(file);
    }}
    className="hidden"
  />

  {/* Upload Button */}
  <label
    htmlFor="profile"
    className="cursor-pointer w-full py-3 rounded-md bg-yellow-100 border border-yellow-400 text-black text-center hover:bg-white transition-all duration-300"
  >
    {image ? "Change Photo" : "Upload Photo"}
  </label>

  {image && (
    <img
      src={URL.createObjectURL(image)}
      className="w-20 h-20 mx-auto mt-3 rounded-full border-2 border-yellow-400 object-cover"
      alt=""
    />
  )}
</div>


        <input className="input" placeholder="Full Name"
          value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}
        />

        <input className="input" placeholder="Age" type="number"
          value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})}
        />

        <input className="input" placeholder="Work"
          value={form.work} onChange={(e)=>setForm({...form, work:e.target.value})}
        />

        <input className="input" placeholder="Education"
          value={form.education} onChange={(e)=>setForm({...form, education:e.target.value})}
        />

        <select className="input"
          value={form.gender} onChange={(e)=>setForm({...form, gender:e.target.value})}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input className="input" placeholder="Hometown"
          value={form.hometown} onChange={(e)=>setForm({...form, hometown:e.target.value})}
        />

        <label className="font-semibold">Interests</label>
        <div className="flex flex-wrap gap-2">
          {interestsList.map((item) => (
            <button
              type="button"
              key={item}
              className={`px-3 py-1 rounded-md border 
              ${form.interests.includes(item) ? "bg-yellow-500 text-white" : "bg-gray-100"}`}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <select className="input"
          value={form.foodPreference} onChange={(e)=>setForm({...form, foodPreference:e.target.value})}>
          <option value="">Food Preference</option>
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Both</option>
        </select>

        <button className="px-4 py-2 bg-yellow-500 rounded text-white">Save</button>
      </form>
    </div>
  );
}
