var time
var resultList = []
const uploadUrl = 'http://58.210.32.10:9091/api1/file/fileUpload'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0In0.nPrGrL638BQe57MNhehRexIPtYr0NCsprsSGZrp6P-Y'
export const uploadImgFunction = ({ file, ...param }) => {
  return new Promise((res) => {
    const fileEntries = file.entries();
    const uploadApi = async (entry: any) => {
      const { done, value } = entry;
      if (done) {
        clearTimeout(time)
        res(resultList);
      } else {
        time = setTimeout(() => {
          const formData = new FormData();
          formData.append('file', value[1]);
          for (let key in param) {
            formData.append(key, param[key])
          }
          fetch(uploadUrl, {
            method: 'post',
            headers: { token },
            body: formData,
          })
            .then((res: any) => res.json(res))
            .then((res: any) => {
              resultList.push(res.data as never)
              uploadApi(fileEntries.next());
            });
        }, 500);
      }
    };
    uploadApi(fileEntries.next());
  });
};