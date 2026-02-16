import { createClient } from "@supabase/supabase-js";

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3YmNmc2RoYXV0bmNocWxkc2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNzA2NTksImV4cCI6MjA4Njc0NjY1OX0.oIi3OLmxN8rH2iL_wXzgMQCDcTzK9zKw-xiKEX3At4Q";

const supabaseUrl = "https://rwbcfsdhautnchqldsgo.supabase.co";

const supabase = createClient(supabaseUrl, anonKey);


export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    } else {
      const timestamp= new Date().getTime();
      const fileName= timestamp+file.name  
      supabase.storage
        .from("images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publicUrl = supabase.storage
            .from("images")
            .getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);
        }).catch(
            ()=>{
                reject("An error occured")
            }
        )
    }
  });
}
