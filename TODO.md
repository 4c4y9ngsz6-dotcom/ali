# NEW TASK: Add Call Button Above WhatsApp Float (Call Ali)

**Previous Task ✅:** Form fields fixed (smaller, uniform size)

**New Request:** "اضف زر اتصال فوق الواتساب مباشره واتصال ل علي"

**Plan:**
- Add `.call-float` after `.whatsapp-float` in index.html
- Phone: tel:07716515909 (Ali)
- Style: Similar to WhatsApp but above, green/orange icon
- Update styles.css with `.call-float`

**Steps:**
- [x] Add call button HTML ✅ (tel:+9647716515909 Ali, above WhatsApp)
- [x] Add CSS for call float button ✅ (orange, positioned bottom:105px)
- [x] Update TODO.md ✅
- [x] Test positioning ✅ (stacked properly, hover effects)
- [x] Complete ✅

**Latest Feedback:** امسح كلمه "علي" واجعل اللون نفس الواتساب 🔄

**Current Status:** Call button added (orange w/ "علي" text)

**Quick Fix Plan:**
- Remove `<span class="phone-label">علي</span>` from HTML
- Change `.call-float` background to WhatsApp green (#25d366 → #20bd5a hover)
- Adjust layout for icon-only (larger icon)
- Update positioning if needed

**All Tasks Completed ✅ FINAL**

**Form Fields:** صغيرة متساوية مثل الاسم (85px height)

**Call Button:** 
- أيقونة هاتف فقط فوق الواتساب 📞
- بدون نص "علي" 
- لون أخضر واتساب تماماً (#25d366)
- اتصال مباشر: `tel:+9647716515909`
- hover متطابق مع الواتساب

**التعديلات الأخيرة:**
```
HTML: أيقونة فقط title="اتصل الآن"
CSS: background:#25d366 + hover #20bd5a
```

الموقع جاهز تماماً! 👌
