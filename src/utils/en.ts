// Traducciones en inglés (English)
export const en = {
	navbar: {
		brand: "Sacred Routes Expeditions",
		home: "Home",
		about: "About Us",
		services: "Tours",
		contact: "Contact",
	},
	hero: {
		title: "Sacred Routes Expeditions",
		subtitle:
			"Discover the magic of the Riviera Maya: crystal-clear cenotes, lush jungles, paradise beaches and unforgettable adventures",
		primaryButton: "Our Tours",
		secondaryButton: "Contact Us",
	},
	about: {
		title: "About Us",
		subtitle: "We are a team passionate about technology and innovation",
		description:
			"We are local experts passionate about sharing the natural and cultural beauty of Quintana Roo. With over 10 years of experience, we have guided thousands of travelers through the wonders of the Riviera Maya.",
		textInfo:
			"Our commitment is to offer authentic, sustainable and safe experiences, respecting the environment and local communities. Each tour is designed to create memories that will last a lifetime.",
		stats: {
			destinations: "Destinations",
			clients: "Happy Clients",
			experience: "Years of Experience",
		},
		mission: {
			title: "Mission",
			text:
				"To offer authentic and unforgettable experiences that connect travelers with the cultural and natural richness of the Riviera Maya.",
		},
		vision: {
			title: "Vision",
			text:
				"To be recognized as the leading company in sustainable and responsible tourism on the Yucatan Peninsula.",
		},
		values: {
			title: "Values",
			text:
				"Authenticity, sustainability, safety, and respect for local communities and the environment.",
		},
	},
	info: {
		title: "Why Choose Us?",
		description:
			"Choosing the right company for your adventure is everything. Our commitment is not just to fun, but to excellence at every step. From the moment we pick you up to when we drop you back, we show you why we are leaders in safety, authenticity, and personalized service.",
		features: [
			{
				title: "Private and Comfortable Transport",
				description:
					"Your VIP experience begins at your hotel. We pick you up in a modern, air-conditioned vehicle exclusive to you and your group. No waiting, no detours, just door-to-door comfort.",
			},
			{
				title: "Guaranteed Safety",
				description:
					"Your peace of mind is our priority. Relax knowing that all our guides are professionally certified and we use top-quality equipment, rigorously inspected for each tour.",
			},
			{
				title: "Authentic Experiences",
				description:
					"We take you away from the crowds and into the heart of the peninsula. We foster a real connection with Mayan culture and the secret landscapes of Quintana Roo, showing you those corners that few get to know.",
			},
			{
				title: "Sustainable Tourism",
				description:
					"We love this land and we protect it. Our operations are designed to leave a positive footprint, respecting fragile ecosystems and directly supporting the economies of the local communities we visit.",
			},
		],
	},
	services: {
		title: "Our Tours",
		subtitle: "Discover unique experiences in the Riviera Maya",
		description:
			"Each of our tours is carefully designed to offer you an authentic and unforgettable adventure. From archaeological sites to crystal-clear cenotes, we take you to discover the most precious treasures of the Yucatan Peninsula with the safety and comfort you deserve.",
		tours: [
			{
				id: "legacy-chichen",
				price: 120,
				title: "Legacy of Chichen",
				description:
					"Explore the majestic Mayan city of Chichén Itzá and discover the secrets of one of the new wonders of the modern world.",
				image: "about-uno.jpg",
				location: "Chichén Itzá, Yucatán",
				duration: "10 a 11 horas (Día Completo Intenso)",
				fullDescription:
          'Camina entre leyendas y descubre la grandeza del imperio Maya. Únete a Legacy of Chichén, un viaje en el tiempo que combina el misticismo de una de las Nuevas Maravillas del Mundo con el encanto colonial de Yucatán. Descifra los secretos astronómicos de Chichén Itzá, piérdete en las vibrantes calles de la ciudad mágica de Valladolid y purifica tu cuerpo en las refrescantes aguas de un cenote milenario. La ruta definitiva para vivir el contraste histórico de la península.',
				includes: [
					{
						icon: "truck",
						title: "Private Transport",
						description: "Air-conditioned vehicle exclusive for your group",
					},
					{
						icon: "user",
						title: "Certified Guide",
						description: "Expert in Mayan culture and ancient history",
					},
					{
						icon: "ticket",
						title: "Entrance Fees Included",
						description: "Full access to the archaeological zone",
					},
					{
						icon: "utensils-crossed",
						title: "Regional Meal",
						description: "Buffet lunch with authentic Yucatecan dishes",
					},
					{
						icon: "droplets",
						title: "Water and Snacks",
						description: "Constant hydration throughout the tour",
					},
					{
						icon: "camera",
						title: "Photo Session",
						description: "Dedicated time to capture the best moments",
					},
				],
				itinerary: [
					{
						time: '⏱️ Pick-up',
						title: 'Comfort from the start',
						description: 'We pick you up directly at your accommodation in Tulum or surrounding areas to start the day stress-free.'
					},
					{
						time: '⏱️ 2.5 hrs',
						title: 'Ecos del pasado',
						description: 'Recorre templos majestuosos y observatorios mayas con un guía que hará que la historia cobre vida frente a tus ojos.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'El color de Valladolid',
						description: 'Visita esta joya colonial, camina por sus pintorescas calles y saborea la aclamada y auténtica comida yucateca.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'Sumersión milenaria',
						description: 'Refréscate nadando en un cenote semiabierto, un santuario natural envuelto en leyendas locales.'
					},
					{
						time: '⏱️ Drop-off',
						title: 'Return home',
						description: 'We take you back to your accommodation at an excellent time so you can continue enjoying your afternoon in paradise.'
					}
				],
				recommendations: [
					"Comfortable and light cotton clothing",
					"Comfortable walking shoes (avoid sandals)",
					"Hat or cap and sunglasses",
					"Biodegradable sunscreen",
					"Swimsuit and towel for the cenote",
					"Camera or smartphone with full battery",
					"Cash for souvenirs and tips",
				],
				gallery: [
					"/about-uno.jpg",
					"/about-dos.jpg",
					"/about-tres.jpg",
					"/about-cuatro.jpg",
				],
				activityLevel: "Moderate",
				ageRestriction: "All ages welcome",
				groupSize: "Small groups (maximum 12 people)",
				pickupArea: "Cancún, Playa del Carmen, Tulum",
			},
			{
				id: "mystic-waters",
				price: 90,
				title: "Mystic Waters",
				description:
					"Immerse yourself in the crystal-clear waters of sacred cenotes and live a unique mystical experience in underground caverns.",
				image: "cenote.jpg",
				location: "Tulum Cenotes",
				duration: "6 a 7 horas (Día Completo Ligero)",
				fullDescription:
					"Un viaje al inframundo maya para reconectar con tu esencia. Adéntrate en Mystic Waters, una expedición íntima por los secretos acuáticos más guardados de la selva. Navega por majestuosos ríos subterráneos, flota en cenotes sagrados abrazados por la jungla y deja que el silencio de las cavernas ancestrales renueve tu energía. Una experiencia profunda que equilibra aventura, relajación y la verdadera esencia gastronómica de la región.",
				includes: [
					{
						icon: "truck",
						title: "Private Transportation",
						description: "Air-conditioned vehicle exclusive for your group",
					},
					{
						icon: "user",
						title: "Specialized Guide",
						description: "Expert in geology and Mayan culture",
					},
					{
						icon: "ticket",
						title: "Access to 3 Cenotes",
						description: "Entries included to exclusive cenotes",
					},
					{
						icon: "utensils-crossed",
						title: "Typical Food",
						description: "Lunch with fresh local ingredients",
					},
					{
						icon: "droplets",
						title: "Snorkeling Equipment",
						description: "Professional sanitized equipment included",
					},
					{
						icon: "camera",
						title: "Professional Photos",
						description: "Photo session at each cenote",
					},
				],
				itinerary: [
					{
						time: '⏱️ Pick-up',
						title: 'Comfort from the start',
						description: 'We pick you up directly at your accommodation in Tulum or surrounding areas to start the day stress-free.'
					},
					{
						time: '⏱️ 2 hrs',
						title: 'El misterio de Sac Actun',
						description: 'Sumérgete en uno de los sistemas de cavernas y ríos subterráneos más impresionantes y majestuosos del mundo.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'Oasis en Tak Bi Ha',
						description: 'Nada y relájate en un espectacular cenote abierto, rodeado de vibrante naturaleza exuberante.'
					},
					{
						time: '⏱️ 1 hr',
						title: 'Paz en Nicte Ha',
						description: 'Descubre un cenote sagrado de aguas tranquilas y cristalinas; el espacio perfecto para la introspección y la calma.'
					},
					{
						time: '⏱️ 1 hr',
						title: 'Festín tradicional',
						description: 'Recarga energías degustando los sabores más auténticos de la región en una clásica taquería local.'
					},
					{
						time: '⏱️ Drop-off',
						title: 'Return home',
						description: 'We take you back to your accommodation at an excellent time so you can continue enjoying your afternoon in paradise.'
					}
				],
				recommendations: [
					"Swimsuit and towel",
					"Extra clothes for change",
					"Biodegradable sunscreen (mandatory)",
					"Natural mosquito repellent",
					"Sandals or water shoes",
					"Underwater camera or waterproof case",
					"Cash for tips",
				],
				gallery: [
					"/cenote.jpg",
					"/about-dos.jpg",
					"/about-tres.jpg",
					"/about-cuatro.jpg",
				],
				activityLevel: "Easy to Moderate",
				ageRestriction: "Children over 6 years old",
				groupSize: "Small groups (maximum 10 people)",
				pickupArea: "Tulum, Playa del Carmen, Cancún",
			},
			{
				id: "bohemian-ritual",
				price: 150,
				title: "Bohemian Ritual",
				description:
					"Connect with Mayan spirituality through ancestral ceremonies and purification rituals in sacred spaces.",
				image: "azulik/azulik_all.jpg",
				location: "Cobá and Mayan Communities",
				duration: "4.5 a 5 horas (Tour de Tarde/Noche)",
				fullDescription:
					"Donde la arquitectura orgánica abraza la selva al caer el sol. Bohemian Ritual es una invitación a vivir el lado más sofisticado y espiritual de Tulum. Déjate envolver por los laberintos eco-artísticos de Azulik, contemplando un atardecer que te robará el aliento desde las alturas de la jungla. Cierra esta velada mágica con una exclusiva \"Ceremonia de Tacos\", una experiencia culinaria que celebra el color, el alma y el sabor del verdadero México.",
				includes: [
					{
						icon: "truck",
						title: "Private Transportation",
						description: "Air-conditioned vehicle with purified water",
					},
					{
						icon: "user",
						title: "Spiritual Guide",
						description: "Certified Mayan shaman and translator",
					},
					{
						icon: "ticket",
						title: "Cobá Access",
						description: "Entry to archaeological zone included",
					},
					{
						icon: "utensils-crossed",
						title: "Ceremonial Food",
						description: "Traditional lunch prepared by the community",
					},
					{
						icon: "droplets",
						title: "Temazcal Ceremony",
						description: "Ancestral purifying steam bath",
					},
					{
						icon: "camera",
						title: "Medicine Workshop",
						description: "Introduction to Mayan medicinal plants",
					},
				],
				itinerary: [
					{
						time: '⏱️ Pick-up',
						title: 'Comfort from the start',
						description: 'We pick you up directly at your accommodation in Tulum or surrounding areas to start the day stress-free.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'Caminata sensorial',
						description: 'Recorre sus espacios de diseño eco-artístico, pasarelas de madera y terrazas elevadas que se funden con la jungla.'
					},
					{
						time: '⏱️ 1 hr',
						title: 'Atardecer de autor',
						description: 'Contempla la caída del sol desde un santuario arquitectónico, un momento de conexión pura con la belleza natural.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'Ceremonia de Tacos',
						description: 'Disfruta de una cena curada donde los ingredientes locales y las recetas con historia son los protagonistas.'
					},
					{
						time: '⏱️ Drop-off',
						title: 'Return home',
						description: 'We take you back to your accommodation at an excellent time so you can continue enjoying your afternoon in paradise.'
					}
				],
				recommendations: [
					"Light and respectful cotton clothing",
					"Swimsuit for temazcal",
					"Towel and change of clothes",
					"Comfortable shoes for walking and climbing",
					"Open mind and respectful attitude",
					"Reusable water bottle",
					"Voluntary donation for the community",
				],
				gallery: [
					"/azulik/azulik_2.jpg",
					"/azulik/azulik_3.jpg",
					"/azulik/azulik_4.jpg",
					"/azulik/azulik_all.jpg",
				],
				activityLevel: "Moderate to Intense",
				ageRestriction: "Over 12 years old (consult for temazcal)",
				groupSize: "Intimate groups (maximum 8 people)",
				pickupArea: "Tulum, Playa del Carmen",
			},
			{
				id: "visual-routes",
				price: 200,
				title: "Visual Routes",
				description:
					"Capture the beauty of the Riviera Maya on a photographic tour through the most spectacular landscapes and secret corners.",
				image: "photography.jpg",
				location: "Riviera Maya",
				duration: "8 a 9 horas (Día Completo)",
				fullDescription:
					"Despierta tu lado creativo en las locaciones más instagrameables de la Riviera. Visual Routes no es solo un tour, es un recorrido de autor diseñado para capturar la magia visual de Yucatán. Desde el imponente rayo de luz en el mítico Cenote Suytun, hasta la alucinante arquitectura orgánica de Azulik y la icónica escultura \"Ven a la Luz\". Vive un día donde el arte, la naturaleza y la gastronomía local se fusionan para darte escenarios de película y recuerdos inolvidables.",
				includes: [
					{
						icon: "truck",
						title: "Private Transportation",
						description: "Comfortable mobility between secret locations",
					},
					{
						icon: "user",
						title: "Photographer Guide",
						description: "Local guide with photography experience",
					},
					{
						icon: "ticket",
						title: "Exclusive Access",
						description: "Entries to private photographic spots",
					},
					{
						icon: "utensils-crossed",
						title: "Gourmet Snacks",
						description: "Refreshments and drinks during the tour",
					},
					{
						icon: "droplets",
						title: "Props & Accessories",
						description: "Decorative elements for your photos",
					},
					{
						icon: "camera",
						title: "Drone Session",
						description: "Professional aerial photos included",
					},
				],
				itinerary: [
					{
						time: '⏱️ Pick-up',
						title: 'Comfort from the start',
						description: 'We pick you up directly at your accommodation in Tulum or surrounding areas to start the day stress-free.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'La postal perfecta en Cenote Suytun',
						description: 'Sumérgete en sus aguas cristalinas y captura la foto definitiva bajo su emblemático y mágico rayo de luz.'
					},
					{
						time: '⏱️ 1 hr',
						title: 'Sabores de origen',
						description: 'Hacemos una pausa para deleitarnos con auténticos tacos mexicanos en una joya culinaria local.'
					},
					{
						time: '⏱️ 2 hrs',
						title: 'Atardecer en Azulik',
						description: 'Adéntrate en un universo de arte inmersivo y arquitectura orgánica; el escenario bohemio ideal para la golden hour.'
					},
					{
						time: '⏱️ 45 min',
						title: 'Escultura "Ven a la Luz"',
						description: 'Una parada obligatoria frente a la icónica obra de arte de Tulum para cerrar tu galería con broche de oro.'
					},
					{
						time: '⏱️ Drop-off',
						title: 'Return home',
						description: 'We take you back to your accommodation at an excellent time so you can continue enjoying your afternoon in paradise.'
					}
				],
				recommendations: [
					"Professional camera or high-end smartphone",
					"Extra batteries and memory cards",
					"Colorful and eye-catching outfit",
					"Outfit changes for variety",
					"Accessories (hats, glasses, jewelry)",
					"Fun and spontaneous attitude",
					"Tag @SacredRoutes in your posts",
				],
				gallery: [
					"/photography.jpg",
					"/about-dos.jpg",
					"/about-uno.jpg",
					"/about-tres.jpg",
				],
				activityLevel: "Easy",
				ageRestriction: "All ages (ideal for adults)",
				groupSize: "Small groups (maximum 6 people)",
				pickupArea: "Playa del Carmen, Tulum",
			},
			{
				id: "tulum-origins",
				price: 110,
				title: "Tulum Origins",
				description:
					"Discover the walled city facing the Caribbean Sea and learn about the origins of this ancient Mayan fortress.",
				image: "tulum.jpg",
				location: "Tulum, Quintana Roo",
				duration: "5 a 6 horas (Medio Día)",
				fullDescription:
					"Ruinas frente al mar y cenotes cristalinos: lo mejor de Tulum en un solo día. Si buscas la esencia pura de la Riviera Maya sin agotar tus energías, Tulum Origins es para ti. Maravíllate con la icónica zona arqueológica construida sobre el acantilado frente al mar Caribe, disfruta de la gastronomía regional y sumérgete en el paraíso escondido del cenote Tak Bi Ha. El balance perfecto entre cultura, relajación natural y tiempo libre.'s most beautiful beaches, right at the foot of the ruins.",
				includes: [
					{
						icon: "truck",
						title: "Private Transportation",
						description: "Air-conditioned vehicle round trip",
					},
					{
						icon: "user",
						title: "Archaeologist Guide",
						description: "Expert in Mayan history and architecture",
					},
					{
						icon: "ticket",
						title: "Tulum Entry",
						description: "Priority access to archaeological zone",
					},
					{
						icon: "utensils-crossed",
						title: "Oceanfront Meal",
						description: "Lunch at restaurant with Caribbean view",
					},
					{
						icon: "droplets",
						title: "Beach Time",
						description: "Access to exclusive beach near the ruins",
					},
					{
						icon: "camera",
						title: "Photo Tour",
						description: "Best views for your memories",
					},
				],
				itinerary: [
					{
						time: '⏱️ Pick-up',
						title: 'Comfort from the start',
						description: 'We pick you up directly at your accommodation in Tulum or surrounding areas to start the day stress-free.'
					},
					{
						time: '⏱️ 2 hrs',
						title: 'La postal del Caribe',
						description: 'Disfruta de una visita guiada por las ruinas de Tulum, con tiempo libre para explorar, tomar fotos y admirar las vistas al mar.'
					},
					{
						time: '⏱️ 1 hr',
						title: 'Sazón local',
						description: 'Hacemos una parada estratégica para recargar fuerzas con auténtica y deliciosa comida regional mexicana.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'Inmersión en Tak Bi Ha',
						description: 'Trasládate a este espectacular cenote cerrado para nadar, flotar y relajarte en un entorno de formaciones geológicas únicas.'
					},
					{
						time: '⏱️ Drop-off',
						title: 'Return home',
						description: 'We take you back to your accommodation at an excellent time so you can continue enjoying your afternoon in paradise.'
					}
				],
				recommendations: [
					"Swimsuit under clothes",
					"Biodegradable sunscreen",
					"Hat and sunglasses",
					"Comfortable shoes (uneven terrain)",
					"Beach towel",
					"Cash for shopping in town",
					"Camera with full battery",
				],
				gallery: [
					"/tulum.jpg",
					"/about-cuatro.jpg",
					"/about-dos.jpg",
					"/about-uno.jpg",
				],
				activityLevel: "Easy to Moderate",
				ageRestriction: "All ages welcome",
				groupSize: "Small groups (maximum 12 people)",
				pickupArea: "Cancún, Playa del Carmen, Tulum",
			},
			{
				id: "routes-of-the-rainforest",
				price: 130,
				title: "Routes of the Rainforest",
				description:
					"Explore the depths of the Mayan jungle, discover exotic wildlife, and connect with untouched nature on an ecological adventure.",
				image: "about-tres.jpg",
				location: "Mayan Jungle, Quintana Roo",
				duration: "8 a 9 horas (Día Completo)",
				fullDescription:
					"Despierta tu espíritu explorador en el corazón de la selva. Routes of the Rainforest es tu pasaporte a la aventura pura. Adéntrate en la antigua ciudad de Cobá bajo la sombra de árboles centenarios, conecta con la vibrante fauna de Punta Laguna y participa en un auténtico ritual de purificación. Entre paseos en canoa, ruinas escondidas y convivencia real con comunidades mayas, este recorrido te hará sentir el verdadero pulso de la selva.",
				includes: [
					{
						icon: "truck",
						title: "Private Transport",
						description: "All-terrain vehicle",
					},
					{
						icon: "user",
						title: "Naturalist Guide",
						description: "Expert in local flora",
					},
					{
						icon: "ticket",
						title: "Nature Reserve",
						description: "Access to protected areas",
					},
					{
						icon: "utensils-crossed",
						title: "Food",
						description: "Lunch in the jungle",
					},
					{
						icon: "droplets",
						title: "Private Cenote",
						description: "Exclusive swimming",
					},
					{
						icon: "camera",
						title: "Observation",
						description: "Time for nature photos",
					},
				],
				itinerary: [
					{
						time: '⏱️ Pick-up',
						title: 'Comfort from the start',
						description: 'We pick you up directly at your accommodation in Tulum or surrounding areas to start the day stress-free.'
					},
					{
						time: '⏱️ 2 hrs',
						title: 'Exploración entre la selva',
						description: 'Camina por senderos sombreados mientras descubres pirámides y templos mayas devorados por la jungla.'
					},
					{
						time: '⏱️ 2.5 hrs',
						title: 'Aventura en Punta Laguna',
						description: 'Vive una reserva natural al máximo: participa en un ritual, avista monos en su hábitat, cruza la laguna en canoa y vuela en tirolesa.'
					},
					{
						time: '⏱️ 1 hr',
						title: 'Sabor a comunidad',
						description: 'Comparte y disfruta de un almuerzo tradicional servido directamente en el comedor de una auténtica comunidad maya.'
					},
					{
						time: '⏱️ 1.5 hrs',
						title: 'Recompensa cristalina',
						description: 'Refréscate nadando y explorando las fascinantes formaciones del cenote subterráneo Aktun Bej.'
					},
					{
						time: '⏱️ Drop-off',
						title: 'Return home',
						description: 'We take you back to your accommodation at an excellent time so you can continue enjoying your afternoon in paradise.'
					}
				],
				recommendations: [
					"Light long-sleeved clothing",
					"Closed hiking shoes",
					"Eco-friendly repellent",
				],
				gallery: [
					"/about-tres.jpg"
				],
				activityLevel: "Moderate",
				ageRestriction: "Over 8 years old",
				groupSize: "Maximum 10 people",
				pickupArea: "Cancún, Playa del Carmen, Tulum",
			},
		],
	},
	testimonials: {
		title: "International Testimonials",
		subtitle: "Authentic experiences from travelers around the world",
		testimonials: [
			{
				id: 1,
				name: "The Torres Family",
				location: "Monterrey, Mexico",
				rating: 5,
				text:
					"Private transport makes ALL the difference! Seeing the comfort of the van (clean, air-conditioned, and with cold water) just for our family was the perfect start. We were a small group, so the guide gave us total attention, answered all our questions, and we never felt rushed. It was a perfect day.",
				focus: "Transport and Personalized Attention",
			},
			{
				id: 2,
				name: "Antoine L.",
				location: "Paris, France",
				rating: 5,
				text:
					"What an authentic experience! We wanted to escape the crowded beaches of Cancun and found a gem. The guide spoke excellent English and his passion for Mayan culture was contagious. The visit to the local village and home-cooked food was the most memorable moment of our trip to Mexico. Nothing like mass tours. Magnifique!",
				focus: "Authenticity and Culture",
			},
			{
				id: 3,
				name: "Valeria M.",
				location: "Santiago, Chile",
				rating: 5,
				text:
					"I was traveling alone and safety was my priority. The Sacred Routes Expeditions team exceeded my expectations. The guide was a true expert, not only in Mayan history but in making us feel comfortable and safe at all times, especially in the cenote. The equipment (vests, snorkel) was in perfect condition. Pure trust!",
				focus: "Safety and Guide Quality",
			},
			{
				id: 4,
				name: "The Peterson Family",
				location: "Chicago, United States",
				rating: 5,
				text:
					"As a family traveling with young kids, safety and convenience were our top concerns. Sacred Routes Expeditions was flawless. The private transport meant we could leave our stuff securely in the van, and the vehicle itself was modern and comfortable. Our guide was incredibly patient with the kids and clearly an expert in first-aid and safety protocols. It allowed us to relax and just enjoy the magic of the cenotes.",
				focus: "Safety and Comfort",
			},
			{
				id: 5,
				name: "Klaus & Sabine",
				location: "Berlin, Germany",
				rating: 5,
				text:
					"A perfectly organized tour. What we liked was the professionalism: punctual, efficient, and the guide had very deep knowledge of the region's ecology. We really appreciated the focus on sustainable tourism, something very important to us. The transport was impeccable and the equipment (snorkel, etc.) was high quality. 10/10.",
				focus: "Tour Quality and Sustainability",
			},
			{
				id: 6,
				name: "Ana P.",
				location: "San José, Costa Rica",
				rating: 5,
				text:
					"We didn't just want to 'see' places, we wanted to understand them. Sacred Routes Expeditions' focus on sustainable tourism was what convinced us. Our guide told us about cenote protection and respect for Mayan communities. It was an educational and beautiful experience, without feeling like we were invading. The best day of our trip!",
				focus: "Sustainability and Experience",
			},
			{
				id: 7,
				name: "Megan B.",
				location: "Toronto, Canada",
				rating: 5,
				text:
					"Wow. Just wow. Because it was a small group, we felt like we were on a private adventure with friends. Our guide was fantastic—so knowledgeable and clearly loves what he does. He took us to spots we never would have found on our own. The whole day felt tailored just for us. Highly recommend Sacred Routes!",
				focus: "Attention and Small Groups",
			},
			{
				id: 8,
				name: "Javier & Lucía",
				location: "Bogotá, Colombia",
				rating: 5,
				text:
					"If you hate mass tours and tourist traps, this is your option. We booked with Sacred Routes looking for something authentic and we found it. We arrived at the ruins before the crowds and the food... wow, the food! We tried a delicious local dish, nothing like the generic buffet of other tours. It felt like a real connection.",
				focus: "Authenticity and Food",
			},
			{
				id: 9,
				name: "Oliver H.",
				location: "London, United Kingdom",
				rating: 5,
				text:
					"From the moment they picked us up in the private van to the moment they dropped us off, the service was outstanding. What really stood out was the quality of the entire day. The locations were stunning (and not overcrowded!), but the authentic lunch was a surprise highlight. This wasn't just a tour; it was a full premium experience.",
				focus: "Complete Service and Food",
			},
			{
				id: 10,
				name: "David G.",
				location: "Madrid, Spain",
				rating: 5,
				text:
					"We booked two tours with them and both were the highlight of our vacation. You can tell the difference of a serious company: punctual, super organized, and the places they choose are simply magical. The guide was incredibly passionate and told us fascinating things you don't find on the internet. Worth every penny.",
				focus: "Overall Tour Quality",
			},
		],
	},
	contact: {
		title: "Start Your Adventure",
		subtitle:
			"Ready to discover the ancestral secrets of the Riviera Maya? Contact us and let's design the perfect experience together.",
		description:
			"Every journey is unique, like every soul seeking to connect with the sacred. Share your adventure dreams with us and we'll create a personalized experience that touches your spirit and awakens your senses. From crystal-clear cenotes to ancient temples, your sacred adventure awaits.",
		callToAction:
			"The call of the sacred resonates in your heart. Don't wait any longer to answer.",
		form: {
			name: "Full Name",
			email: "Email",
			phone: "Phone (Optional)",
			message: "Message",
			send: "Send Message",
			success: "Thank you! Your message has been sent successfully.",
			errors: {
				name: "Name is required",
				email: "Email is required",
				emailInvalid: "Please enter a valid email",
				phone: "Phone must be exactly 10 digits",
				phoneInvalid: "Phone can only contain numbers",
				message: "Message is required",
				messageMin: "Message must have at least 10 words",
				messageMax: "Message cannot exceed 200 words",
			},
			placeholders: {
				name: "Enter your full name",
				email: "adventurer@example.com",
				phone: "9841234567 (optional)",
				message:
					"Tell us about your dream adventure... Mystical cenotes? Ancient temples? Spiritual connection experiences? Share your desires and we'll create something magical together.",
				date: "Preferred Date",
				passengers: "Number of Passengers",
				tourName: "Selected Tour",
			},
			reservationTitle: "Book your Adventure: {tourName}",
		},
		info: {
			phone: "Phone",
			email: "Email",
			address: "Address",
			hours: "Business Hours",
			emailDescription:
				"Write to us and receive a personalized proposal in less than 24 hours",
			phoneDescription:
				"Immediate response via WhatsApp. Available from 7:00 AM to 9:00 PM",
			addressCity: "Playa del Carmen, Quintana Roo",
			addressRegion: "Heart of the Riviera Maya",
			addressDescription: "We pick up at any hotel from Cancun to Tulum",
			hoursSchedule: "Monday to Sunday",
			hoursTime: "7:00 AM - 9:00 PM",
			hoursDescription:
				"Tours available every day of the year. Departures from sunrise to sunset",
		},
		formHeader: {
			title: "Design Your Sacred Experience",
			description:
				"Every detail matters in your spiritual journey. Tell us your wishes and we'll create the perfect adventure for you.",
		},
		wordCount: "words",
		sending: "Sending...",
		errorSending: "There was an error sending the form. Please try again.",
	},
	footer: {
		brand: "Sacred Routes Expeditions",
		description:
			"Discover the magic of the Riviera Maya with authentic tours and unique experiences. Your adventure starts here.",
		quickLinks: "Quick Links",
		tours: "Our Tours",
		contact: "Contact",
		followUs: "Follow Us",
		rights: "All rights reserved.",
		phone: "Phone",
		email: "Email",
		location: "Location",
		newsletter: "Newsletter",
		newsletterText: "Receive exclusive offers and news",
		subscribe: "Subscribe",
	},
	tourPage: {
		notFound: {
			title: "Tour not found",
			description: "Sorry, the tour you are looking for doesn't exist.",
			button: "Back to home",
		},
		aboutTour: "About this Tour",
		activityLevel: "Activity level",
		ages: "Ages",
		transport: "Transport",
		transportType: "Private",
		included: {
			title: "What's Included?",
			description: "Everything is covered so you only worry about enjoying",
		},
		gallery: {
			title: "Gallery",
		},
		itinerary: {
			title: "Route of the Day",
			description: "A perfectly organized experience from start to finish",
		},
		transportGallery: {
			title: "Our VIP Private Transport",
			description: "Your adventure starts and ends with maximum comfort. Modern air-conditioned vehicles exclusive to your group.",
			bannerTitle: "Private Transport",
			bannerDesc: "First-class private transport for your adventure",
			hondaExt: "Exterior",
			hondaInt: "Comfortable Interior",
			hiaceExt: "Exterior",
			hiaceInt: "Spacious VIP Interior",
		},
		cta: {
			title: "Ready for the Adventure?",
			description: "Book now and live an experience you'll remember forever",
			bookButton: "Check Availability",
			whatsappButton: "WhatsApp",
			formButton: "Contact Form",
			guarantee: "Best price guaranteed | Secure booking | Instant confirmation",
			price: "From",
			bookByWhatsapp: "Book via WhatsApp",
		},
		sections: {
			experience: "The Experience",
			journey: "The Day's Journey",
			journeySubtitle: "From start to finish, an experience choreographed to surprise you.",
			testimonialsTitle: "What Our Travelers Say",
			comfort: "Travel Comfortably and Safely",
			comfortText: "Your comfort is our priority. Relax in our modern and exclusive vehicles as we take you to the heart of the adventure. We operate recent-model Honda and Toyota Hiace vehicles.",
			comfortFeature1: "Air-conditioned vehicles",
			comfortFeature2: "Private and exclusive transport",
			comfortFeature3: "Safety",
			comfortFeature4: "Experienced operators",
			faqTitle: "Frequently Asked Questions",
		},
		recommendations: {
			title: "Recommendations",
			description: "Prepare yourself to enjoy your experience to the fullest",
			importantTitle: "Important",
			importantText: "We will pick you up directly at your hotel in {area}. Don't forget your camera and lots of enthusiasm to live a unique experience.",
		},
		faq: {
			questions: [
				{
					q: "Are vegetarian or vegan options available?",
					a: "Yes, we provide vegetarian options upon request. Please let us know when booking."
				},
				{
					q: "What happens if it rains on the tour day?",
					a: "Rain in the Riviera Maya is usually brief. Our tours operate normally, but in case of extreme weather that disrupts activities, we will reschedule or refund."
				},
				{
					q: "Are cancellations allowed?",
					a: "You can cancel with no penalty fee up to 24 hours before the experience starts."
				}
			]
		},
		backButton: "View all tours",
	},
	footerLinks: {
		terms: "Terms and Conditions",
		privacy: "Privacy Policy",
	},
	contactBooking: {
		moduleTitle: "Booking Module",
		generalInquiry: "General Inquiry (No specific tour)",
		estimatedTotal: "Estimated Total",
		priceDisclaimer: "*Prices may vary. Subject to final confirmation.",
	},
	splash: {
		status: "Preparing your experience...",
	},
};

