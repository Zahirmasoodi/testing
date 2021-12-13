const countriesArray_ = [
  { value: "الإمارات العربية المتحدة" },
  { value: "أفغانستان" },
  { value: "ألبانيا" },
  { value: "الجزائر" },
  { value: "أندورا" },
  { value: "أنغولا" },
  { value: "أنتيغوا وباربودا" },
  { value: "الأرجنتين" },
  { value: "أرمينيا" },
  { value: "أستراليا" },
  { value: "النمسا" },
  { value: "أذربيجان" },
  { value: "البهاما" },
  { value: "البحرين" },
  { value: "بنغلاديش" },
  { value: "باربادوس" },
  { value: "بيلاروسيا" },
  { value: "بلجيكا" },
  { value: "بليز" },
  { value: "بنين" },
  { value: "بوتان" },
  { value: "بوليفيا" },
  { value: "البوسنة والهرسك " },
  { value: "بوتسوانا" },
  { value: "البرازيل" },
  { value: "بروناي" },
  { value: "بلغاريا" },
  { value: "بوركينا فاسو " },
  { value: "بوروندي" },
  { value: "كمبوديا" },
  { value: "الكاميرون" },
  { value: "كندا" },
  { value: "الرأس الأخضر" },
  { value: "جمهورية أفريقيا الوسطى " },
  { value: "تشاد" },
  { value: "تشيلي" },
  { value: "الصين" },
  { value: "كولومبيا" },
  { value: "جزر القمر" },
  { value: "كوستاريكا" },
  { value: "ساحل العاج" },
  { value: "كرواتيا" },
  { value: "كوبا" },
  { value: "قبرص" },
  { value: "التشيك" },
  { value: "جمهورية الكونغو الديمقراطية" },
  { value: "الدنمارك" },
  { value: "جيبوتي" },
  { value: "دومينيكا" },
  { value: "جمهورية الدومينيكان" },
  { value: "تيمور الشرقية " },
  { value: "الإكوادور" },
  { value: "مصر" },
  { value: "السلفادور" },
  { value: "غينيا الاستوائية" },
  { value: "إريتريا" },
  { value: "إستونيا" },
  { value: "إثيوبيا" },
  { value: "فيجي" },
  { value: "فنلندا" },
  { value: "فرنسا" },
  { value: "الغابون" },
  { value: "غامبيا" },
  { value: "جورجيا" },
  { value: "ألمانيا" },
  { value: "غانا" },
  { value: "اليونان" },
  { value: "جرينادا" },
  { value: "غواتيمالا" },
  { value: "غينيا" },
  { value: "غينيا بيساو" },
  { value: "غويانا" },
  { value: "هايتي" },
  { value: "هندوراس" },
  { value: "المجر" },
  { value: "آيسلندا" },
  { value: "الهند" },
  { value: "إندونيسيا" },
  { value: "إيران" },
  { value: "العراق" },
  { value: "جمهورية أيرلندا " },
  { value: "فلسطين" },
  { value: "إيطاليا" },
  { value: "جامايكا" },
  { value: "اليابان" },
  { value: "الأردن" },
  { value: "كازاخستان" },
  { value: "كينيا" },
  { value: "كيريباتي" },
  { value: "الكويت" },
  { value: "قرغيزستان" },
  { value: "لاوس" },
  { value: "لاوس" },
  { value: "لاتفيا" },
  { value: "لبنان" },
  { value: "ليسوتو" },
  { value: "ليبيريا" },
  { value: "ليبيا" },
  { value: "ليختنشتاين" },
  { value: "ليتوانيا" },
  { value: "لوكسمبورغ" },
  { value: "مدغشقر" },
  { value: "مالاوي" },
  { value: "ماليزيا" },
  { value: "جزر المالديف" },
  { value: "مالي" },
  { value: "مالطا" },
  { value: "جزر مارشال" },
  { value: "موريتانيا" },
  { value: "موريشيوس" },
  { value: "المكسيك" },
  { value: "مايكرونيزيا" },
  { value: "مولدوفا" },
  { value: "موناكو" },
  { value: "منغوليا" },
  { value: "الجبل الأسود" },
  { value: "المغرب" },
  { value: "موزمبيق" },
  { value: "بورما" },
  { value: "ناميبيا" },
  { value: "ناورو" },
  { value: "نيبال" },
  { value: "هولندا" },
  { value: "نيوزيلندا" },
  { value: "نيكاراجوا" },
  { value: "النيجر" },
  { value: "نيجيريا" },
  { value: "كوريا الشمالية " },
  { value: "النرويج" },
  { value: "سلطنة عمان" },
  { value: "باكستان" },
  { value: "بالاو" },
  { value: "بنما" },
  { value: "بابوا غينيا الجديدة" },
  { value: "باراغواي" },
  { value: "بيرو" },
  { value: "الفلبين" },
  { value: "بولندا" },
  { value: "البرتغال" },
  { value: "قطر" },
  { value: "جمهورية الكونغو" },
  { value: "جمهورية مقدونيا" },
  { value: "رومانيا" },
  { value: "روسيا" },
  { value: "رواندا" },
  { value: "سانت كيتس ونيفيس" },
  { value: "سانت لوسيا" },
  { value: "سانت فنسينت والجرينادينز" },
  { value: "ساموا" },
  { value: "سان مارينو" },
  { value: "ساو تومي وبرينسيب" },
  { value: "السعودية" },
  { value: "السنغال" },
  { value: "صربيا" },
  { value: "سيشيل" },
  { value: "سيراليون" },
  { value: "سنغافورة" },
  { value: "سلوفاكيا" },
  { value: "سلوفينيا" },
  { value: "جزر سليمان" },
  { value: "الصومال" },
  { value: "جنوب أفريقيا" },
  { value: "كوريا الجنوبية" },
  { value: "جنوب السودان" },
  { value: "إسبانيا" },
  { value: "سريلانكا" },
  { value: "السودان" },
  { value: "سورينام" },
  { value: "سوازيلاند" },
  { value: "السويد" },
  { value: "سويسرا" },
  { value: "سوريا" },
  { value: "طاجيكستان" },
  { value: "تنزانيا" },
  { value: "تايلاند" },
  { value: "توغو" },
  { value: "تونجا" },
  { value: "ترينيداد وتوباغو" },
  { value: "تونس" },
  { value: "تركيا" },
  { value: "تركمانستان" },
  { value: "توفالو" },
  { value: "أوغندا" },
  { value: "أوكرانيا" },
  { value: "المملكة المتحدة" },
  { value: "الولايات المتحدة" },
  { value: "أوروغواي" },
  { value: "أوزبكستان" },
  { value: "فانواتو" },
  { value: "فنزويلا" },
  { value: "فيتنام" },
  { value: "اليمن" },
  { value: "زامبيا" },
  { value: "زيمبابوي" },
];

export default countriesArray_;