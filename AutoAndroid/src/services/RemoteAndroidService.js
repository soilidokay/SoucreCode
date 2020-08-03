/**
 * Athor: Unmatched Tai Nguyen - 14 /06 /2019 - 13 :06 :54
 *
 */
const ServiceBase = require("./ServiceBase");
class RemoteAndroidService extends ServiceBase {
  constructor() {
    super();
  }
}
module.exports = new RemoteAndroidService();

// const { Error } = require("../Contants/Config");
// const ServiceBase = require("./ServiceBase");
// const QuocGia = require("../Mongoose/Models/QuocGIa");

// class QuocGiaService extends ServiceBase {
//     constructor() {
//         super(QuocGia);
//     }
//     CreateDiaDanh = async (params, model) => {
//         const quocgia = await QuocGia.findById(model.idquocgia);

//         if (!quocgia) return Error.ErrorNotFoundContry;

//         quocgia.DiaDanh.push(model);
//         let diadanh = quocgia.DiaDanh[0];

//         return await quocgia
//             .save()
//             .then(result => {
//                 return diadanh;
//             })
//             .catch(error => {
//                 return error;
//             });

//     };
//     DeleteDiaDanh = async (params, model) => {
//         const quocgia = await QuocGia.findById(model.idquocgia);

//         if (!quocgia) return Error.ErrorNotFoundContry;
//         let indexdiadanh = quocgia.DiaDanh.findIndex(
//             item => item._id + "" === model._id
//         );

//         if (indexdiadanh < 0) return Error.ErrorNotFoundSites;

//         quocgia.DiaDanh.id(model._id).remove();

//         return await quocgia.save();
//     };
//     SearchDiaDanh = async (params, model) => {
//         return await QuocGia.findOne({ "DiaDanh._id": params.id }).then((result) => {

//             if (!result) return Error.ErrorNotFoundSites

//             let diadanh = result.DiaDanh.filter(x => x._id + '' === params.id)[0]

//             if (diadanh) return diadanh
//             else return Error.ErrorNotFoundSites

//         }).catch(error => error);
//     };
// }
// module.exports = new QuocGiaService();
