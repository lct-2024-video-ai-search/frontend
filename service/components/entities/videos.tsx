const links = [
  "https://cdn-st.rutubelist.ru/media/39/6c/b31bc6864bef9d8a96814f1822ca/fhd.mp4",
  "https://cdn-st.rutubelist.ru/media/2f/4f/6b969c8c4a2aafcfca057b2a99a2/fhd.mp4",
  "https://cdn-st.rutubelist.ru/media/87/43/b11df3f344d0af773aac81e410ee/fhd.mp4",
  "https://cdn-st.rutubelist.ru/media/d1/e7/642dc2194fcdb69664f832d5f2dd/fhd.mp4",
  "https://cdn-st.rutubelist.ru/media/a3/9f/2352de2748b3868df583d51a402b/fhd.mp4",
  "https://cdn-st.rutubelist.ru/media/bf/6a/f040f0dd4afc90b8eb12c8d76571/fhd.mp4",
];

const Video = (props: { src: string }) => {
  return (
    <div className="overflow-hidden rounded-[0.75rem]">
      <video controls>
        <source src={props.src} type="video/mp4" />
      </video>
    </div>
  );
};

const Videos = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}
      className="w-full"
    >
      {links.map((link, index) => (
        <Video src={link} key={index} />
      ))}
    </div>
  );
};

export { Videos };
