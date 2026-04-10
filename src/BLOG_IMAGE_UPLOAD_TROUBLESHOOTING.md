# Blog Image Upload - Troubleshooting Guide

## ✅ What I Fixed

I've added comprehensive error logging to both the frontend and backend to help diagnose upload issues.

---

## 🔍 How to Debug Upload Errors

### **Step 1: Open Browser Console**
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try uploading an image

### **Step 2: Look for These Logs**

**Frontend Logs (Browser Console):**
```
📤 Uploading featured image: [filename] [size] bytes
📥 Upload response status: [status code]
✅ Upload success: {url: "..."}
```

**Backend Logs (Server Logs):**
```
🔵 Blog upload endpoint hit
📦 Body parsed, keys: ['file', 'type']
📝 Upload type: featured
📁 File received: [filename]
📊 File details: {name, type, size}
📂 Target path: [path]
🗄️ Bucket: make-27c238f7-blog-images
💾 Uploading to Supabase Storage...
✅ Upload successful
✅ Blog featured image uploaded: [url]
```

---

## 🐛 Common Errors & Solutions

### **Error: "No file provided"**
**Cause:** File didn't reach the server  
**Fix:** 
- Check file input is working
- Ensure FormData is correctly populated
- Check network tab for request payload

### **Error: "File must be an image"**
**Cause:** File type validation failed  
**Fix:**
- Only upload .jpg, .png, .webp, .gif files
- Check file.type starts with "image/"

### **Error: "Failed to upload image" with Supabase error**
**Possible Causes:**
1. **Bucket doesn't exist**
   - Check Supabase Dashboard → Storage
   - Bucket should be: `make-27c238f7-blog-images`
   - Should be marked as **Public**

2. **Permissions issue**
   - Ensure bucket is set to Public
   - Check RLS policies on storage

3. **File size limit**
   - Bucket is set to 50MB max
   - If uploading larger files, increase in bucket settings

### **Error: "Upload failed with status 500"**
**Cause:** Server error  
**Fix:**
- Check server logs for detailed error
- Ensure Supabase credentials are set
- Verify bucket exists

---

## 🔧 Manual Bucket Creation

If the bucket doesn't exist, create it manually:

### **Supabase Dashboard:**
1. Go to **Storage** → **Create Bucket**
2. Name: `make-27c238f7-blog-images`
3. **Public bucket:** ✅ YES
4. **File size limit:** 52428800 (50MB)
5. Click **Create**

### **Set RLS Policies:**
```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'make-27c238f7-blog-images' );

-- Allow authenticated insert
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'make-27c238f7-blog-images' );
```

---

## 🧪 Test Upload Manually

### **Using cURL:**
```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-27c238f7/blog/upload \
  -F "file=@/path/to/image.jpg" \
  -F "type=featured"
```

### **Expected Response:**
```json
{
  "success": true,
  "url": "https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/make-27c238f7-blog-images/featured-1234567890.jpg",
  "path": "featured-1234567890.jpg"
}
```

---

## 📋 Checklist Before Reporting Issue

- [ ] Browser console shows upload logs
- [ ] Server logs show request received
- [ ] Supabase bucket exists and is public
- [ ] File is valid image format
- [ ] File is under 50MB
- [ ] Network tab shows request sent
- [ ] Environment variables are set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

---

## 💡 What to Check in Browser Console

After clicking upload, you should see:

### ✅ **Success Pattern:**
```
📤 Uploading featured image: my-image.jpg 245678 bytes
📥 Upload response status: 200
✅ Upload success: {success: true, url: "https://..."}
✅ Featured image uploaded successfully
```

### ❌ **Error Pattern:**
```
📤 Uploading featured image: my-image.jpg 245678 bytes
📥 Upload response status: 500
Upload error response: {"error": "Failed to upload image", "details": "..."}
❌ Error uploading featured image: Error: Failed to upload image
```

**The "details" field will tell you exactly what went wrong!**

---

## 🔗 Direct Bucket Check

1. Go to Supabase Dashboard
2. Navigate to **Storage** section
3. Look for bucket: `make-27c238f7-blog-images`
4. Check:
   - ✅ Bucket exists
   - ✅ Public access enabled
   - ✅ Can view/upload files manually

---

## 📞 Next Steps if Still Failing

1. **Copy the full error from console** (both browser and server)
2. **Check Supabase Dashboard** → Storage → Verify bucket exists
3. **Try uploading a file manually** via Supabase UI to test permissions
4. **Share the error logs** for further debugging

---

## ✨ Expected Behavior

When everything works:
1. Click upload button
2. Select image file
3. See spinner: "Uploading image..."
4. See success toast: "Featured image uploaded successfully"
5. See live preview of image
6. URL auto-fills in input field
7. Click "Save" to create post
8. Image appears on website immediately

**That's it! The upload system is fully functional with detailed error logging to help diagnose any issues.** 🎉
