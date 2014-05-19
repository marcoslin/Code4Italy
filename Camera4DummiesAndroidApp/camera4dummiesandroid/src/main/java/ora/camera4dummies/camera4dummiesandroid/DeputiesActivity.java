package ora.camera4dummies.camera4dummiesandroid;

/**
 * Created by joaobiriba on 18/05/14.
 */

import android.app.ListActivity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.view.MenuItem;
import android.view.View;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;

public class DeputiesActivity extends ListActivity {
    private Context context;
    //  private static String url = "http://docs.blackberry.com/sampledata.json";

    private static String url_pre = "http://dati.camera.it/sparql?default-graph-uri=&query=";
    private static String url_pos = "&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK";

    private static String sqlCollegio;

    private String collegio;

    ArrayList<HashMap<String, String>> jsonlist = new ArrayList<HashMap<String, String>>();

    ListView lv;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sparqlsecondquerylayout);
        getActionBar().setDisplayHomeAsUpEnabled(true);


        new ProgressTask(this).execute();
    }



    /*
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sparqlquerylayout);
        new ProgressTask(MainSparqlQuery.this).execute();
    }*/

    private class ProgressTask extends AsyncTask<String, Void, Boolean> {
        private ProgressDialog dialog;

        private ListActivity activity;

        // private List<Message> messages;
        public ProgressTask(ListActivity activity) {
            this.activity = activity;
            context = activity;
            dialog = new ProgressDialog(context);
        }


        private Context context;

        protected void onPreExecute() {
            this.dialog.setMessage("Loading data");
            this.dialog.show();
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            if (dialog.isShowing()) {
                dialog.dismiss();
            }
            ListAdapter adapter = new SimpleAdapter(context, jsonlist,
                    R.layout.list_item_second, new String[]{"collegioValue", "countValue"}, new int[]{
                    R.id.collegioValue, R.id.countValue }
            );

            setListAdapter(adapter);

            // select single ListView item
            lv = getListView();
        }

        protected Boolean doInBackground(final String... args) {

            JSONParser jParser = new JSONParser();
            // get JSON data from URL
            JSONObject json = null;
            collegio = getIntent().getExtras().getString("collegio");


            String sql_pre = "select distinct ?deputato ?nome ?cognome ?img ?categoryY ?categoryX where { ?deputato a ocd:deputato; foaf:firstName ?nome; foaf:surname ?cognome; foaf:gender ?categoryY ; foaf:depiction ?img; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>; ocd:rif_mandatoCamera ?mandato . ?mandato ocd:rif_elezione ?elezione . ?elezione dc:coverage \"";
            String sql_pos = "\" FILTER NOT EXISTS{ ?mandato ocd:endDate ?date } ?deputato ocd:aderisce ?aderisce . ?aderisce ocd:rif_gruppoParlamentare ?gruppo . ?gruppo <http://purl.org/dc/terms/alternative> ?categoryX . MINUS{?aderisce ocd:endDate ?fineAdesione} }";

            String eeee = url_pre + sql_pre + collegio + sql_pos + url_pos;
            String urlstring = null;
            try {


                urlstring = URLEncoder.encode(sql_pre + collegio + sql_pos, "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            json = jParser.getJSONFromUrl(url_pre + urlstring + url_pos);


            try {


                JSONObject result = json.getJSONObject("results");

                JSONArray bindings = result.getJSONArray("bindings");

                for (int i = 0; i < bindings.length(); i++) {

                    try {

                        JSONObject collegio = bindings.getJSONObject(i).getJSONObject("nome");
                        JSONObject count = bindings.getJSONObject(i).getJSONObject("cognome");
                        JSONObject img = bindings.getJSONObject(i).getJSONObject("img");
                        JSONObject id = bindings.getJSONObject(i).getJSONObject("deputato");


                        String collegioValue = collegio.getString("value");
                        String countValue = count.getString("value");
                        String imgurl = img.getString("value");
                        String idurl = id.getString("value");

                        HashMap<String, String> map = new HashMap<String, String>();

                        // Add child node to HashMap key & value
                        map.put("collegioValue", collegioValue);
                        map.put("countValue", countValue);
                        map.put("img", imgurl);
                        map.put("id", idurl);

                        jsonlist.add(map);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }


            return null;
        }
    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        String selectedFromList = ((HashMap<String, String>) lv.getItemAtPosition(position)).get("img");
        String name =  ((HashMap<String, String>) lv.getItemAtPosition(position)).get("collegioValue");
        String surname =  ((HashMap<String, String>) lv.getItemAtPosition(position)).get("countValue");
        String idr =  ((HashMap<String, String>) lv.getItemAtPosition(position)).get("id");

        Intent intent = new Intent(this, DeputyActivity.class);
       /* intent.setAction(android.content.Intent.ACTION_VIEW);
        intent.addCategory(android.content.Intent.CATEGORY_DEFAULT);
        intent.setDataAndType(Uri.parse(selectedFromList), "image/*");*/
        intent.putExtra("img", selectedFromList);
        intent.putExtra("name", name);
        intent.putExtra("surname", surname);
        intent.putExtra("id", idr);

        startActivity(intent);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}


