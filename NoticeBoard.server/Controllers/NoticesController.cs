using Microsoft.AspNetCore.Mvc;
using NoticeBoard.server.Models;
using NoticeBoard.server.Services;

namespace NoticeBoard.server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoticesController : ControllerBase
    {
        private readonly JsonDataService _dataService;

        public NoticesController(JsonDataService dataService)
        {
            _dataService = dataService;
        }

       
        [HttpGet]
        public ActionResult<List<Notice>> Get()
        {
            return _dataService.GetAllNotices();
        }

       
        [HttpPost]
        public ActionResult<Notice> Post(Notice notice)
        {
            var addedNotice = _dataService.AddNotice(notice);
            return CreatedAtAction(nameof(Get), new { id = addedNotice.Id }, addedNotice);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool isDeleted = _dataService.DeleteNotice(id);

            if (isDeleted)
                return NoContent(); 

            return NotFound(); 
        }

        [HttpPut("{id}")]
        public ActionResult<Notice> Put(int id, [FromBody] NoticeUpdate notice)
        {
            Notice? updatedNotice = _dataService.UpdateNotice(id, notice);

            if (updatedNotice != null)
                return Ok(updatedNotice);

            return NotFound();
        }
    }
}

