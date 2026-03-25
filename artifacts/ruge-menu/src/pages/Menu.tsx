import { useState, useEffect } from "react";

const carouselImages = [
  { src: "/burger-bacon.jpg", label: "RECOLETA" },
  { src: "/burger-soho.jpg", label: "PALERMO SOHO" },
  { src: "/burger-triple.jpg", label: "RUGE SMASH" },
  { src: "/burger-clasica.jpg", label: "FLORESTA" },
  { src: "/burger-huevo.jpg", label: "ALMAGRO" },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      {carouselImages.map((img, i) => (
        <div
          key={i}
          className={`carousel-slide ${i === current ? "active" : ""}`}
        >
          <img src={img.src} alt={img.label} />
          <div className="carousel-overlay" />
          <div className="carousel-label">{img.label}</div>
        </div>
      ))}
      <div className="carousel-dots">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

interface MenuItemProps {
  name: string;
  highlight?: string;
  description: string;
  price?: string;
  prices?: { label: string; value: string }[];
  isNew?: boolean;
}

function MenuItem({ name, highlight, description, price, prices, isNew }: MenuItemProps) {
  const parts = highlight ? name.split(highlight) : [name];
  return (
    <div className="menu-item">
      <div className="menu-item-header">
        <div className="menu-item-name">
          {highlight ? (
            <>
              <span className="name-white">{parts[0]}</span>
              <span className="name-yellow">{highlight}</span>
              {parts[1] && <span className="name-white">{parts[1]}</span>}
            </>
          ) : (
            <span className="name-white">{name}</span>
          )}
          {isNew && <span className="badge-new">NEW</span>}
        </div>
        {price && (
          <div className="price-pill">${price}</div>
        )}
        {prices && (
          <div className="price-multi">
            {prices.map((p) => (
              <div key={p.label} className="price-row">
                {p.label && <span className="price-label">{p.label}</span>}
                <span className="price-pill small">${p.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="menu-item-desc">{description}</p>
    </div>
  );
}

interface SectionProps {
  title: string;
  titleHighlight?: string;
  children: React.ReactNode;
  heroImg?: string;
  heroAlt?: string;
}

function Section({ title, titleHighlight, children, heroImg, heroAlt }: SectionProps) {
  const parts = titleHighlight ? title.split(titleHighlight) : [title];
  return (
    <section className="menu-section">
      {heroImg && (
        <div className="section-hero">
          <img src={heroImg} alt={heroAlt || title} className="section-hero-img" />
          <div className="section-hero-overlay" />
          <h2 className="section-hero-title">
            {titleHighlight ? (
              <>
                {parts[0]}
                <span className="yellow">{titleHighlight}</span>
                {parts[1]}
              </>
            ) : title}
          </h2>
        </div>
      )}
      {!heroImg && (
        <div className="section-header">
          <h2 className="section-title">
            {titleHighlight ? (
              <>
                {parts[0]}
                <span className="yellow">{titleHighlight}</span>
                {parts[1]}
              </>
            ) : title}
          </h2>
          <div className="section-divider" />
        </div>
      )}
      <div className="section-items">
        {children}
      </div>
    </section>
  );
}

function ComboCard() {
  return (
    <div className="combo-card">
      <div className="combo-fire">🔥</div>
      <div className="combo-content">
        <div className="combo-title">¡COMBO DEL MES!</div>
        <div className="combo-subtitle">Ruge Smash Doble + Papas Colombianas + Bebida</div>
        <div className="combo-price">$12<sup>99</sup></div>
        <div className="combo-note">Solo por tiempo limitado</div>
      </div>
      <div className="combo-fire">🔥</div>
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890?text=Hola!%20Quiero%20hacer%20un%20pedido%20de%20Ruge%20Hamburguesas%20🍔"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      🔥 ¡PEDIR AHORA POR WHATSAPP!
    </a>
  );
}

export default function Menu() {
  return (
    <div className="menu-page">
      <header className="menu-header">
        <div className="logo-area">
          <div className="logo-icon">🔥</div>
          <div>
            <div className="logo-title">RUGE</div>
            <div className="logo-subtitle">by Juan Reyes</div>
          </div>
        </div>
        <div className="tagline">Sabor que te hace rugir</div>
      </header>

      <Carousel />

      <main className="menu-content">

        <Section title="HAMBUR" titleHighlight="GUESAS" heroImg="/burger-tomate.jpg" heroAlt="Hamburguesas Ruge">
          <MenuItem
            name="RECOLETA "
            highlight="🔥"
            description="Blend de punta trasera molida hecha a la parrisha, tiras de punta trasera envueltas en queso cheddar, tocineta crispy y pepinillos."
            price="10.99"
          />
          <MenuItem
            name="RUGE "
            highlight="SMASH"
            description="Blend de punta trasera super smash, queso cheddar y pepinillos."
            prices={[
              { label: "DOBLE", value: "7.99" },
              { label: "TRIPLE", value: "9.99" },
            ]}
          />

          <MenuItem
            name="FLOR"
            highlight="ESTA"
            description="Blend de punta trasera súper smash con cebolla, queso cheddar y pepinillos."
            prices={[
              { label: "SIMPLE", value: "5.99" },
              { label: "DOBLE", value: "7.99" },
              { label: "TRIPLE", value: "9.99" },
            ]}
          />
          <MenuItem
            name="PUERTO "
            highlight="MADERO"
            description="Doble blend de punta trasera molida hecha a la parrisha, queso cheddar fundido, doble tocineta crispy y doble pepinillo."
            price="11.99"
          />
          <MenuItem
            name="VILLA "
            highlight="DEVOTO"
            description="Porkbelly crujiente, cebolla encurtida con chimichurri, mayo aguacate, tomate."
            price="9.99"
            isNew
          />
          <MenuItem
            name="EL "
            highlight="CHORI"
            description="Chorizo ahumado, chimichurri Ruge y mayoaguacate."
            price="6.99"
            isNew
          />

          <MenuItem
            name="AL"
            highlight="MAGRO"
            description="Blend de punta trasera molida hecha a la parrisha, queso cheddar fundido, maxi tocineta crispy, cebolla, queso cheddar y tomate."
            price="10.99"
          />
          <MenuItem
            name="AVEL"
            highlight="LANEDA"
            description="Blend de punta trasera molida hecha a la parrisha, queso cheddar fundido, tiras de punta trasera, tocineta crispy."
            price="10.99"
          />
          <MenuItem
            name="PALER"
            highlight="MO"
            description="Blend de punta trasera molida hecha a la parrisha, queso cheddar fundido, cebolla a la BBQ, tocineta crispy y tomate."
            price="8.99"
          />
          <MenuItem
            name="SAN "
            highlight="TELMO"
            description="Doble carne smash de punta trasera molida hecha a la parrisha, queso cheddar fundido, tocineta crispy, aros de cebolla y pepinillos."
            price="9.99"
          />
          <MenuItem
            name="NUEVA "
            highlight="POMPEYA"
            description="Blend de punta trasera molida hecha a la parrisha, queso gouda, cebolla caramelizada y huevo."
            price="8.99"
          />
          <MenuItem
            name="PALERMO "
            highlight="HOLLYWOOD"
            description="Punta de punta trasera molida hecha a la parrisha, queso cheddar fundido, pollo crispy, tocineta crispy, tomate y huevo."
            price="14.99"
          />

          <MenuItem
            name="PALERMO "
            highlight="SOHO"
            description="Carne súper smash, queso cheddar fundido, chuleta ahumada, papas en hilo y cebolla caramelizada."
            price="10.99"
          />

          <MenuItem
            name="RETI"
            highlight="RO"
            description="Doble carne smash de punta trasera molida hecha a la parrisha, queso gouda, cebolla crispy y tocineta crispy."
            price="9.99"
            isNew
          />
          <MenuItem
            name="MONT"
            highlight="SERRAT"
            description="Pollo crispy con 7 especias, queso cheddar fundido, tocineta crispy, tomate y pepinillos."
            price="9.99"
          />
          <MenuItem
            name="VILLA "
            highlight="CRESPO"
            description="Pollo a la parrisha con queso mozzarella fundido, tocineta crispy y tomate."
            price="7.99"
          />
          <MenuItem
            name="CAMINITO "
            highlight="KIDS"
            description="Blend de punta trasera smash molida hecha a la parrisha, queso cheddar fundido y tocineta crispy."
            price="5.99"
          />
          <MenuItem
            name="LA "
            highlight="BOCA"
            description="Blend de Punta Trasera Smash molida hecha a la parrisha, con mozzarella fundido, huevo y tomate."
            price="6.99"
          />
          <div className="menu-note">
            Todas las Ruge Hamburguesas vienen con 1 acompañante y nuestro pan es 100% artesanal sellado con mantequilla de ajo y finas hierbas, acompañado con nuestra deliciosa salsa RUGE y salsa de tomate.
          </div>
        </Section>

        <ComboCard />

        <Section title="EN" titleHighlight="TRADAS" heroImg="/provoleta.jpg" heroAlt="Entradas Ruge">
          <MenuItem
            name="RUGE "
            highlight="BOOM 🔥"
            description="Esferas de pollo rellenas con queso mozzarella acompañado con salsa RUGE."
            prices={[
              { label: "x5", value: "7.99" },
              { label: "x10", value: "13.99" },
            ]}
          />
          <MenuItem
            name="RUGE "
            highlight="RAW"
            description="Tiras de pollo crispy salteadas con nuestra salsa BBQ a base de whisky."
            prices={[
              { label: "REGULAR", value: "6.99" },
              { label: "MAXI", value: "10.99" },
            ]}
          />
          <MenuItem
            name="PORK "
            highlight="BELLY 🔥"
            description="Crocantes cubos de pork belly."
            prices={[
              { label: "REGULAR", value: "10.99" },
              { label: "MAXI", value: "19.99" },
            ]}
          />
          <MenuItem
            name="ALI"
            highlight="TAS"
            description="Todas nuestras alitas son hecha únicamente a la parrisha. Las puedes saltear con tu salsa a elección: BBQ, picantes, miel mostaza o sin salsa."
            prices={[
              { label: "x6", value: "5.99" },
              { label: "x12", value: "9.99" },
              { label: "x24", value: "17.99" },
              { label: "x30", value: "25.99" },
            ]}
            isNew
          />
          <MenuItem
            name="PROVOLETA "
            highlight="PARRILLERA"
            description="Queso tipo provolone a la parrisha, con especias y papas chips de acompañante."
            price="6.99"
          />
          <MenuItem
            name="AROS DE "
            highlight="CEBOLLA"
            description="Aros de cebolla crispy."
            price="5.99"
          />
          <MenuItem
            name="RUGE POP "
            highlight="CHICKEN"
            description="Popcorn chicken acompañado de papas fritas."
            price="6.99"
          />
          <MenuItem
            name="NUG"
            highlight="GETS"
            description="Nuggets de pollo acompañados de papas fritas."
            price="6.99"
          />
          <MenuItem
            name="TEQUE"
            highlight="ÑOS"
            description="5 tequeños de la casa acompañados con salsa RUGE."
            price="5.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="COLOMBIANAS"
            description="300g de papas colombianas salteadas en aceite de tocineta y queso parmesano."
            price="6.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="RUGELITO"
            description="Papas fritas bañadas con queso cheddar fundido y tocineta crispy."
            price="7.99"
          />
        </Section>

        <Section title="PA" titleHighlight="PAS" heroImg="/papas-cargadas.jpg" heroAlt="Papas Ruge">
          <MenuItem
            name="PAPAS AL "
            highlight="CHORI"
            description="Papas fritas bañadas con queso cheddar fundido y chorizo a la parrisha con chimichurri."
            price="8.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="POPS"
            description="Papas fritas bañadas con queso cheddar fundido, ruge popa y tocineta crispy."
            price="8.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="PARRI"
            description="Papas fritas bañadas con queso cheddar fundido, tocineta crispy, tiras de punta trasera y pollo a la parrisha."
            price="9.99"
          />
          <MenuItem
            name="RUGE "
            highlight="MIX"
            description="Aros de cebolla (4uds) tequeños (3uds) ruge popa (5uds) alitas (4uds) y papas fritas."
            price="9.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="RUGE"
            description="Papas fritas bañadas con queso cheddar fundido, tiras de punta trasera a la parrisha y tocineta crispy."
            price="8.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="REJILLA"
            description="Papas rejilla crujientes."
            price="6.99"
          />
          <MenuItem
            name="PAPAS A LA "
            highlight="PROVENZAL"
            description="Papas fritas salteadas con ajo y perejil."
            price="6.99"
          />
          <MenuItem
            name="PAPAS "
            highlight="REGULARES"
            description="Papas fritas clásicas."
            price="5.99"
          />
        </Section>

        <Section title="ENSA" titleHighlight="LADAS" heroImg="/ensalada-cesar.jpg" heroAlt="Ensaladas Ruge">
          <MenuItem
            name="ENSALADA DE "
            highlight="PORK BELLY"
            description="Porkbelly crocante, lechuga, tomate, cebolla encurtida. Mayoaguacate."
            price="8.99"
            isNew
          />
          <MenuItem
            name="ENSALADA "
            highlight="CÉSAR"
            description="Lechuga, queso parmesano, croutons, tocineta crispy y aderezo césar."
            prices={[
              { label: "SIN POLLO", value: "5.99" },
              { label: "+ POLLO", value: "8.99" },
            ]}
          />
          <MenuItem
            name="ENSALADA "
            highlight="RUGE"
            description="Lechuga, cebolla, tomate, maíz, aguacate y vinagreta de parrisha."
            price="5.99"
          />
          <MenuItem
            name="ENSALADA "
            highlight="CAPRESE"
            description="Tomate, queso mozzarella, tejas de parmesano y pesto de pistacho."
            price="4.99"
          />
          <MenuItem
            name="ENSALADA "
            highlight="RUGELITO"
            description="Lechuga, tomate, cebolla, vinagreta parrisha."
            price="3.99"
            isNew
          />
        </Section>

        <Section title="PARRI" titleHighlight="SHA" heroImg="/parrisha-carne.jpg" heroAlt="Parrisha Ruge">
          <MenuItem
            name="PARRILLA "
            highlight="RUGE"
            description="150g de punta trasera importada (Certified Angus Beef), 150g de pechuga de pollo a la parrisha, 1 chorizo ahumado y papas a elección."
            price="18.99"
          />
          <MenuItem
            name="COLITA DE "
            highlight="CUADRIL"
            description="300g de colita de res importada (Certified Angus Beef) a la parrisha, acompañada de papas a elección y ensalada ruge."
            price="23.99"
          />
          <MenuItem
            name="PARRILLA "
            highlight="RUGELITO"
            description="Punta trasera importada 150g (Certified Angus Beef), 150g de milanesa o churrasco de pollo, 150g de pork belly, ensalada y papas a elección."
            price="22.99"
          />
          <MenuItem
            name="TAPA DE "
            highlight="CUADRIL"
            description="Punta trasera importada 300g (Certified Angus Beef) a la parrisha, acompañada de papas a elección y ensalada."
            price="23.99"
          />
          <MenuItem
            name="RIB "
            highlight="EYE"
            description="300g de Rib Eye importada (Certified Angus Beef) a la parrisha, acompañado de ensalada ruge y papas a elección."
            price="24.99"
          />
          <MenuItem
            name="TIRAS DE ASADO "
            highlight="RUGE"
            description="300g de tiras de asado importada (Certified Angus Beef) a la parrisha, acompañada con 1 chorizo ahumado, papas a elección y ensalada."
            price="23.99"
          />
        </Section>

        <Section title="POS" titleHighlight="TRES" heroImg="/postre.jpg" heroAlt="Postres Ruge">
          <MenuItem
            name="RUGE "
            highlight="COOKIE"
            description="Cookie red velvet y cookie chocolate chip con helado y salsa de chocolate."
            price="6.99"
          />
        </Section>

        <WhatsAppButton />

        <footer className="menu-footer">
          <div className="footer-logo">🔥 RUGE</div>
          <div className="footer-sub">by Juan Reyes</div>
          <div className="footer-copy">Todos los precios incluyen IVA</div>
        </footer>
      </main>
    </div>
  );
}
