using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using WebApi.Models;

namespace WebApi.Controllers
{
  
    public class DefaultController : ApiController
    {
        
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Liste()
        {
            
            List<Sonuc> tmp = new List<Sonuc>
            {
                new Sonuc {SNO=1,Ad="a",Y1="10",Y2="50",Y3="70" },
                new Sonuc {SNO=2,Ad="b",Y1="20",Y2="60",Y3="60" },
                new Sonuc {SNO=3,Ad="c",Y1="30",Y2="70",Y3="50"},
                new Sonuc {SNO=4,Ad="d",Y1="40",Y2="80",Y3="80" },
                new Sonuc {SNO=5,Ad="e",Y1="50",Y2="90",Y3="90" },
                new Sonuc {SNO=6,Ad="f",Y1="60",Y2="80",Y3="80" },
                new Sonuc {SNO=7,Ad="g",Y1="70",Y2="90",Y3="90" },

            };

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, tmp);
            return response;

        }

        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Kaydet([FromBody] List<Sonuc> data)
        {
            HttpResponseMessage response;
            if (data == null)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, data);
             
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.OK, data.Count);
            }
            return response;

        }

    }
}
