// Vimperator Plugin: 'Delicious'
// Last Change: 22-Apr-2009
// License: MIT
// Maintainer: Travis Jeffery <travisjeffery@gmail.com>
// URL: http://github.com/travisjeffery/vimperator-scripts/
// Usage: Use :delicious <tags delimited by spaces> command
// Usage: if successfully posted you will see "done" echoed

// PLUGIN_INFO//{{{
var PLUGIN_INFO =
<VimperatorPlugin>
    <name>{NAME}</name>
    <description>Delicious from Vimperator</description>
    <author mail="travisjeffery@gmail.com" homepage="http://github.com/travisjeffery/">travisjeffery</author>
    <version>1.0</version>
    <updateURL>http://github.com/travisjeffery/vimperator-scripts/tree/master</updateURL>
    <detail><![CDATA[

== COMMANDS ==
tinyurl [URL]:
    echo and copy URL
expandurl URL:
    expand URL

== LIBRARY ==
plugins.tinyurl.getTiny(url):
    return TinyURL
plugins.tinyurl.getExpand(url):
    return ExpandURL

    ]]></detail>
</VimperatorPlugin>;
//}}}

commands.addUserCommand(['delicious'], "Save page as a bookmark on Delicious",
                        function(args) {
                            var url = "https://api.del.icio.us/v1/posts/add?";
                            url += "&url=" + encodeURIComponent(buffer.URL);
                            url += "&description=" + encodeURIComponent(buffer.title);
                            url += "&tags=" + encodeURIComponent(args.string);
                            
                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url, false);
                            xhr.send(null);
                            var xml = (new DOMParser()).parseFromString(xhr.responseText, "text/xml");
                            var status = xml.getElementsByTagName('result')[0].getAttribute('code');
                            
                            liberator.echo(status);
                        });
