module.exports = {
    staff(action) {
        if (!action.member.roles.cache.find(r => r.id === "819306403041640459")) {
            action.reply({ content: `**Nejsi STAFF pro použití tohoto příkazu.**` });
            return false;
        } else {
            return true;
        }
    },

    isButtonAuthor(i) {
        a = i.message.interaction.user.id;
        b = i.user.id;
        if (b !== a) return false;
        else return true;
    }
};