import React, { useRef, useState } from "react";

const styles = `
  :root {
    --bg: #ffffff;
    --text: #111827;
    --muted: #6b7280;
    --ring: #e5e7eb;
    --card: #ffffff;
    --shadow: 0 6px 22px rgba(0,0,0,0.06);
    --radius: 18px;
  }
  .aboutus__page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
  }
  .aboutus__container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 20px;
  }
  .aboutus__header {
    text-align: center;
    margin-bottom: 36px;
  }
  .aboutus__title {
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .aboutus__subtitle {
    margin-top: 10px;
    font-size: clamp(14px, 2.5vw, 18px);
    color: var(--muted);
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  .aboutus__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
  }
  @media (min-width: 820px) {
    .aboutus__grid { grid-template-columns: repeat(3, 1fr); }
  }
  .card {
    background: var(--card);
    border: 1px solid var(--ring);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .card__header { padding: 20px; text-align: center; }
  .avatar {
    width: 140px; height: 140px; border-radius: 50%;
    margin: 0 auto 14px; position: relative;
    border: 4px solid var(--ring);
    overflow: hidden; display: grid; place-items: center;
    background: #f9fafb; cursor: pointer;
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .avatar__placeholder { font-size: 28px; opacity: 0.65; }
  .member-name { font-weight: 700; font-size: 18px; margin-bottom: 4px; }
  .member-role { font-size: 15px; color: var(--muted); }
`;

function ProfileCard({ name, role }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const onPickImage = () => fileInputRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="card">
      <div className="card__header">
        <div
          className="avatar"
          onClick={onPickImage}
          aria-label="Profile photo"
        >
          {preview ? (
            <img src={preview} alt={name || "Team member"} />
          ) : (
            <div className="avatar__placeholder" aria-hidden>
              📷
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <div className="member-name">{name}</div>
        <div className="member-role">{role}</div>
      </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <section className="aboutus__page">
      <style>{styles}</style>
      <div className="aboutus__container">
        <header className="aboutus__header">
          <h1 className="aboutus__title">Meet the Team</h1>
          <p className="aboutus__subtitle">
            Three passionate builders behind our product.
          </p>
        </header>

        <div className="aboutus__grid">
          <ProfileCard name="Sahil Rajput" role="Frontend Engineer" />
          <ProfileCard name="Akash Jasrotia" role="Backend Engineer" />
          <ProfileCard name="Teammate Three" role="Product Designer" />
        </div>
      </div>
    </section>
  );
}
