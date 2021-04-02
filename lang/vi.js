const transValidation = {
    email_incorrect : "Email phải có dạng Example@gmail.com.",
    user_incorrect : "Tên đăng nhập phải ít nhất 3 kí tự, bao gồm chữ hoa, chữ thường, chữ số.",
    password_incorrect : "Mật khẩu phải ít nhất 6 ký  tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.",
    re_password_incorrect : "Mật khẩu nhập lại chưa chính xác.",
}

const transError = {
    account_in_use : "Email đã được sử dụng.",
    login_failed : "Email hoặc mật khẩu không chính xác.",
    server_errors : "Có lỗi ở phía Server.",
    account_removed : "Tài khoản đã bị vô hiệu hóa hoặc xóa ra khỏi hệ thống.",
    account_isNotActive : "Tài khoản đã được đăng ký nhưng chưa active tài khoản, hãy kiểm tra lại hộp thư email của bạn.",
    account_errorActive : "Kích hoạt tài khoản không thành công, vui lòng liên hệ bộ phận kĩ thuật để được hỗ trợ",
    account_Actived : "Tài khoản đã được kích hoạt."
}

const transSuccess = {
    userCreated : (userEmail) => {
        return `Tài khoản "${userEmail}" đã được tạo, vui lòng kiểm tra lại email của bạn để active tài khoản trước khi đăng nhập.`
    },
    account_actived : "Tài khoản đã được kích hoạt thành công, bạn đã có thể đăng nhập vào ứng dụng My Chat.",
    loginSuccess : (username) => {
        return `Xin chào ${username}, chúc bạn một ngày mới tốt lành.`
    },
    logout_success : "Đăng xuất thành công, hẹn gặp lại."
}

const transMail = {
    subject : "My chat: Xác nhận kích hoạt tài khoản. ",
    template : (linkVerify) => {
        return `   
        <h2>Bạn đã nhận được email này vì đã đăng ký tài khoản trên ứng dụng My Chat.</h2>
        <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
        <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
        <h3>Xin cảm ơn!</h3> `
    },
    send_failed : "Đã xảy ra lỗi trong quá trình gửi email, vui lòng liên hệ bộ phận kĩ thuật để được hỗ trợ."
}

module.exports = { transValidation, transError, transSuccess, transMail};




