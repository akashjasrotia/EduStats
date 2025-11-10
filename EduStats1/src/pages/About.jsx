import { useRef, useState } from "react";

function ProfileCard({ name, role }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const pickImage = () => inputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
      {/* Avatar */}
      <div
        onClick={pickImage}
        className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
      >
        {preview ? (
          <img src={preview} alt={name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-3xl opacity-60">📷</span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Name + Role */}
      <h3 className="mt-4 text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-sm text-secondary">{role}</p>
    </div>
  );
}

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-primary">Meet the Team</h1>
        <p className="mt-2 text-gray-600">
          Three passionate builders behind our product.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          <ProfileCard name="Sahil Rajput" role="Frontend Engineer" />
          <ProfileCard name="Akash Jasrotia" role="Backend Engineer" />
          <ProfileCard name="Abhishek Kumar" role="Advisor" />
        </div>
      </div>
    </section>
  );
}
