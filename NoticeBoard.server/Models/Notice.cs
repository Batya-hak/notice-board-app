namespace NoticeBoard.server.Models
{
    public class Notice
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;

        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
    }

    public class NoticeUpdate
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
    }
}
