export default function Features() {
  const features = [
    { id: 1, img: 'f1.png', title: 'Free Shipping' },
    { id: 2, img: 'f2.png', title: 'Online Order' },
    { id: 3, img: 'f3.png', title: 'Save Money' },
    { id: 4, img: 'f4.png', title: 'Promotions' },
    { id: 5, img: 'f5.png', title: 'Happy Sell' },
    { id: 6, img: 'f6.png', title: '24/7 Support' },
  ];

  return (
    <section id="feature" className="section-p1">
      {features.map((feature) => (
        <div key={feature.id} className="fet-box">
          <img src={`/imgs/features/${feature.img}`} alt={feature.title} />
          <h6>{feature.title}</h6>
        </div>
      ))}
    </section>
  );
}