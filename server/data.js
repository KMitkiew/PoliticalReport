const comments = [
	{
		id: 1,
		body: 'First comment',
		username: 'Jack',
		userId: 1,
		parentId: null,
		eventId: 181913649,
		createdAt: '2021-08-16T23:00:33.010+02:00',
	},
	{
		id: 2,
		body: 'Second comment',
		username: 'John',
		userId: 2,
		parentId: null,
		eventId: 181913649,
		createdAt: '2021-08-16T23:00:33.010+02:00',
	},
	{
		id: 3,
		body: 'First comment first child',
		username: 'John',
		userId: 2,
		parentId: 1,
		eventId: 181913649,
		createdAt: '2021-08-16T23:00:33.010+02:00',
	},
	{
		id: 4,
		body: 'Second comment second child',
		username: 'John',
		userId: 2,
		parentId: 2,
		eventId: 181913649,
		createdAt: '2021-08-16T23:00:33.010+02:00',
	},
];

const events = [
	{
		id: 181913649,
		supportPercentage: 25,
		eventType: 'reforma szkolnictwa',
		date: '11-12-2005',
		shortDescription:
			"Reforma ma za zadanie likwidację gimnazjów i przywrócenie poprzedniego systemu. Zwolennicy uważają, że przedłuży to dzieciństwo polskich dzieci i zapewni im bardziej kompleksową opiekę, z kolei przeciwnicy wskazują na koszta reformy i podważają narrację obozu rządzącego.",
		source: [
			'https://gazetaA.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://gazetaB.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://gazetaC.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://gazetaD.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913650,
		supportPercentage: 30,
		eventType: 'reforma szkolnictwa',
		date: '11-5-2005',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913651,
		supportPercentage: 35,
		eventType: 'reforma szkolnictwa',
		date: '11-20-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913652,
		supportPercentage: 40,
		eventType: 'reforma szkolnictwa',
		date: '11-15-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913653,
		supportPercentage: 45,
		eventType: 'reforma szkolnictwa',
		date: '10-21-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913654,
		supportPercentage: 50,
		eventType: 'reforma szkolnictwa',
		date: '10-20-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913655,
		supportPercentage: 55,
		eventType: 'reforma szkolnictwa',
		date: '10-13-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913656,
		supportPercentage: 60,
		eventType: 'reforma szkolnictwa',
		date: '10-8-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913657,
		supportPercentage: 65,
		eventType: 'reforma szkolnictwa',
		date: '10-7-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913658,
		supportPercentage: 70,
		eventType: 'reforma szkolnictwa',
		date: '10-2-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913659,
		supportPercentage: 75,
		eventType: 'reforma szkolnictwa',
		date: '10-1-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913660,
		supportPercentage: 80,
		eventType: 'reforma szkolnictwa',
		date: '9-30-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913661,
		supportPercentage: 85,
		eventType: 'reforma szkolnictwa',
		date: '9-27-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
	{
		id: 181913662,
		supportPercentage: 90,
		eventType: 'reforma szkolnictwa',
		date: '9-24-2001',
		shortDescription:
			"'Wprowadzona reforma szkolnictwa w Polsce zalicza się do jednych z najbardziej chaotycznych i źle przemyślanych działań rządu PiS w ostatnich latach. Reforma wprowadziła masę zmian bez konsultacji z nauczycielami, rodzicami czy uczniami, co stworzyło atmosferę niezrozumienia i niechęci do nowych przepisów. Nowe podręczniki i program nauczania wydają się być bardziej wynikiem politycznych uwarunkowań niż rzeczywistych potrzeb edukacyjnych.' ~ Gazeta Wyborzcza",
		source: [
			'https://wyborcza.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://dorzeczy.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://onet.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
			'https://interia.pl/7,75398,30375495,reforma-szkol-bez-szans.html#S.MT-K.C-B.1-L.1.duzy',
		],
		politicsInvolved: [181913649, 181913650, 181913653, 181913657],
		likes: [],
		disslikes: [],
	},
];

const politics = [
	{
		id: 181913649, //id
		name: 'Donald', //name
		surname: 'Tusk',
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913650, //id
		name: 'Donald', //name and surname
		surname: 'Tusk',
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913651, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913652, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913653, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913654, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913655, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913656, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913657, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913658, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913659, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913660, //id
		name: 'Donald',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
			partyAffilation: [
				'2007-2019 Prawo i Sprawiedliwość'
			], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913661, //id
		name: 'Dana',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
		partyAffilation: [
			'2007-2019 Prawo i Sprawiedliwość'
		], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
	{
		id: 181913662, //id
		name: 'Donek',
		surname: 'Tusk', //name and surname
		profilePicture:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7', //profile picture
		eventsNumber: 22, //total number of events
		newEvents: 8, //events which weren't displayed
		trustLevel: 60, //total level of trust (likes do disslikes ratio)
		shortInfo:
			'Jacek Robert Sasin- polski polityk i urzędnik samorządowy. Poseł na Sejm VII, VIII, IX i X kadencji. W 2007 wojewoda mazowiecki, w latach 2009-2010 zastępca szefa Kancelarii Prezydenta RP, w latach 2018-2019 sekretarz stanu w Kancelarii Prezesa Rady Ministrów, w latach 2019-2023 wiceprezes Rady Ministrów, od 2019 minister aktywów państwowych.', //short description
		partyAffilation: [
			'2007-2019 Prawo i Sprawiedliwość'
		], //parties
		education: [
			'Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)',
			'Studia podyplomowe- Zarządzanie w Administracji Publicznej na Akademii Leona Koźmińskiego',
		], //education
		career: [
			'(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”',
			'(1998-2004) dyrektor Departamentu Orzecznictwa w Urzędzie do spraw Kombatantów i Osób Represjonowanych',
		], //proffesional activity
		status: 'aktywny',
	},
];

const users = [
	{
		id: 181913649,
		name: 'Krzysztof',
		surname: 'Mitkiewicz',
		photo:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7',
		email: 'kmitkiewicz@interia.pl',
		password: 'password',
		likes: [181913651, 181913652],
		dislikes: [181913653, 181913654],
		observedPolitics: [181913662, 181913661, 181913660, 181913659, 181913658],
		seenEvents: [181913651],
		population: 'up-to-50k',
		birthDate: '1999-05-11'
	},
	{
		id: 181913650,
		name: 'Jano',
		surname: 'Wanto',
		photo:
			'https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7',
		email: 'janowantokurwommanto@patriotyczna.pl',
		password: 'cisco',
		likes: [181913651, 181913652],
		dislikes: [181913653, 181913654],
		observedPolitics: [181913662, 181913661, 181913660, 181913659, 181913658, 181913657, 181913656, 181913655, 181913654, 181913653, 181913652],
		seenEvents: [181913652, 181913652],
		population: 'village',
		birthDate: '1999-05-11'
	},
];

const newEvents = [
	{
		id: 181913661, //id
		politicID: 181913661,
		name: 'Dana',
		surname: 'Tusk', //name and surname
		date: '1999-05-11',
		shortDescription: 'Donald Tusk w dzikim szale wydał dekret na szakale!',
		link: 'https://www.onet.pl/informacje/newsweek/w-najgorszym-scenariuszu-ukraina-zalamie-sie-latem-zabraknie-nam-ludzi-szybciej-niz/t0yry4t,452ad802',
	}
]

module.exports = { comments, events, politics, users, newEvents };
