using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using NoticeBoard.server.Models;
using System.Text.Json;

namespace NoticeBoard.server.Services
{
    public class JsonDataService
    {
        private readonly string _filePath;
        public JsonDataService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "Data", "notices.json");
        }
        public List<Notice> GetAllNotices()
        {
            if (!File.Exists(_filePath)) return new List<Notice>();
            string json = File.ReadAllText(_filePath);

            return JsonSerializer.Deserialize<List<Notice>>(json) ?? new List<Notice>();
        }

        public void SaveNotices(List<Notice> notices)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(notices, options);

            File.WriteAllText(_filePath, json);
        }

        public Notice AddNotice(Notice newNotice)
        {
            var notices = GetAllNotices();
            newNotice.Id = notices.Any() ? notices.Max(p => p.Id) + 1 : 1;
            notices.Add(newNotice);
            SaveNotices(notices);
            return newNotice;
        }

        public bool DeleteNotice(int id)
        {
            var notices = GetAllNotices();
            var noticeToDelete = notices.FirstOrDefault(n => n.Id == id);

            if (noticeToDelete == null)
                return false;

            notices.Remove(noticeToDelete);
            SaveNotices(notices);

            return true;
        }

        public Notice? UpdateNotice(int id, [FromBody] NoticeUpdate updatedNotice)
        {
            var notices = GetAllNotices();
            var existingNotice = notices.FirstOrDefault(n => n.Id == id);

            if (existingNotice == null)
                return null; 

            existingNotice.Title = updatedNotice.Title;
            existingNotice.Content = updatedNotice.Content;

            SaveNotices(notices); 
            return existingNotice;
        }
    }
}
