package ora.camera4dummies.camera4dummiesandroid;

/**
 * Created by joaobiriba on 18/05/14.
 */

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import com.nineoldandroids.view.animation.AnimatorProxy;
import com.sothree.slidinguppanel.SlidingUpPanelLayout;
import com.sothree.slidinguppanel.SlidingUpPanelLayout.PanelSlideListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;

public class DeputyActivity extends ActionBarActivity {
    private static final String TAG = "DeputyActivity";

    private static String url_pre = "http://dati.camera.it/sparql?default-graph-uri=&query=";
    private static String url_pos = "&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK";

    public static final String SAVED_STATE_ACTION_BAR_HIDDEN = "saved_state_action_bar_hidden";

    private SlidingUpPanelLayout mLayout;

    private ProgressBar pd;

    private String nomedeputato;

    ArrayList<HashMap<String, String>> idattiList = new ArrayList<HashMap<String, String>>();

    ArrayList<HashMap<String, String>> jsonlist = new ArrayList<HashMap<String, String>>();

    private ListView lv;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_ACTION_BAR_OVERLAY);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        setContentView(R.layout.slidingpanel);

        mLayout = (SlidingUpPanelLayout) findViewById(R.id.sliding_layout);
        mLayout.setPanelSlideListener(new PanelSlideListener() {
            @Override
            public void onPanelSlide(View panel, float slideOffset) {
                Log.i(TAG, "onPanelSlide, offset " + slideOffset);
                setActionBarTranslation(mLayout.getCurrentParalaxOffset());
            }

            @Override
            public void onPanelExpanded(View panel) {
                Log.i(TAG, "onPanelExpanded");

            }

            @Override
            public void onPanelCollapsed(View panel) {
                Log.i(TAG, "onPanelCollapsed");

            }

            @Override
            public void onPanelAnchored(View panel) {
                Log.i(TAG, "onPanelAnchored");

            }
        });

        pd = (ProgressBar) findViewById(R.id.progressBar);

        TextView t = (TextView) findViewById(R.id.name);
        String name = getIntent().getExtras().getString("name");
        String surname = getIntent().getExtras().getString("surname");
        String imguri = getIntent().getExtras().getString("img");

        t.setText(name + " " + surname);
        ImageButton f = (ImageButton) findViewById(R.id.follow);
        f.setImageResource(R.drawable.logo_camera_deputati);


        ImageView pic = (ImageView) findViewById(R.id.pic);
        new DownloadImageTask(pic).execute(imguri);

        boolean actionBarHidden = savedInstanceState != null && savedInstanceState.getBoolean(SAVED_STATE_ACTION_BAR_HIDDEN, false);
        if (actionBarHidden) {
            int actionBarHeight = getActionBarHeight();
            setActionBarTranslation(-actionBarHeight);//will "hide" an ActionBar
        }


        lv = (ListView) findViewById(R.id.actList);

        LayoutInflater inflater = getLayoutInflater();
        View header = inflater.inflate(R.layout.header, null, false);

        lv.addHeaderView(header);
        new ActTask(this).execute();

    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(SAVED_STATE_ACTION_BAR_HIDDEN, mLayout.isExpanded());
    }


    private int getActionBarHeight() {
        int actionBarHeight = 0;
        TypedValue tv = new TypedValue();
        if (getTheme().resolveAttribute(android.R.attr.actionBarSize, tv, true)) {
            actionBarHeight = TypedValue.complexToDimensionPixelSize(tv.data, getResources().getDisplayMetrics());
        }
        return actionBarHeight;
    }

    public void setActionBarTranslation(float y) {
        // Figure out the actionbar height
        int actionBarHeight = getActionBarHeight();
        // A hack to add the translation to the action bar
        ViewGroup content = ((ViewGroup) findViewById(android.R.id.content).getParent());
        int children = content.getChildCount();
        for (int i = 0; i < children; i++) {
            View child = content.getChildAt(i);
            if (child.getId() != android.R.id.content) {
                if (y <= -actionBarHeight) {
                    child.setVisibility(View.GONE);
                } else {
                    child.setVisibility(View.VISIBLE);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                        child.setTranslationY(y);
                    } else {
                        AnimatorProxy.wrap(child).setTranslationY(y);
                    }
                }
            }
        }
    }


    class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        @Override
        protected void onPreExecute() {
            // TODO Auto-generated method stub
            super.onPreExecute();
            pd.setVisibility(View.VISIBLE);
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return mIcon11;
        }

        @Override
        protected void onPostExecute(Bitmap result) {
            super.onPostExecute(result);
            pd.setVisibility(View.GONE);
            bmImage.setImageBitmap(result);
        }


    }


    private class ProgressTask extends AsyncTask<String, Void, Boolean> {
        private ProgressDialog dialog;

        private Activity activity;

        // private List<Message> messages;
        public ProgressTask(Activity activity) {
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


            // select single ListView item
            // lv.setAdapter(adapter);

            for (HashMap<String, String> uriMap : idattiList) {
                String uri = uriMap.get("attoValue");
                new ActTask(activity).execute(uri);

            }
        }

        protected Boolean doInBackground(final String... args) {

            JSONParser jParser = new JSONParser();
            // get JSON data from URL
            JSONObject json = null;
            nomedeputato = "<" + getIntent().getExtras().getString("id") + ">";


            String sql_pre = "select distinct ?deputato ?nome ?cognome ?img ?categoryY ?categoryX where { ?deputato a ocd:deputato; foaf:firstName ?nome; foaf:surname ?cognome; foaf:gender ?categoryY ; foaf:depiction ?img; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>; ocd:rif_mandatoCamera ?mandato . ?mandato ocd:rif_elezione ?elezione . ?elezione dc:coverage \"";
            String sql_pos = "\" FILTER NOT EXISTS{ ?mandato ocd:endDate ?date } ?deputato ocd:aderisce ?aderisce . ?aderisce ocd:rif_gruppoParlamentare ?gruppo . ?gruppo <http://purl.org/dc/terms/alternative> ?categoryX . MINUS{?aderisce ocd:endDate ?fineAdesione} }";

            String atto_sql_01 = "select distinct * where { OPTIONAL {?atto ocd:primo_firmatario ";
            String atto_sql_02 = " . ?atto a ocd:atto.} OPTIONAL {?atto ocd:altro_firmatario ";
            String atto_sql_03 = " . ?atto a ocd:atto.} }";


            String eeee = url_pre + atto_sql_01 + nomedeputato + atto_sql_02 + nomedeputato + atto_sql_03 + url_pos;
            String urlstring = null;
            try {
                urlstring = URLEncoder.encode(atto_sql_01 + nomedeputato + atto_sql_02 + nomedeputato + atto_sql_03, "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            json = jParser.getJSONFromUrl(url_pre + urlstring + url_pos);


            try {


                JSONObject result = json.getJSONObject("results");

                JSONArray bindings = result.getJSONArray("bindings");

                for (int i = 0; i < bindings.length(); i++) {

                    try {

                        JSONObject atto = bindings.getJSONObject(i).getJSONObject("atto");


                        String attovalue = atto.getString("value");
                        HashMap<String, String> map = new HashMap<String, String>();

                        // Add child node to HashMap key & value
                        map.put("attoValue", attovalue);

                        idattiList.add(map);


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


    private class ActTask extends AsyncTask<String, String, Boolean> {
        private ProgressDialog dialog;

        private Activity activity;

        // private List<Message> messages;
        public ActTask(Activity activity) {
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
                    R.layout.list_item_second, new String[]{"attoValue"}, new int[]{
                    R.id.collegioValue}
            );


            // select single ListView item
            lv.setAdapter(adapter);
        }

        protected Boolean doInBackground(final String... args) {

            JSONParser jParser = new JSONParser();
            // get JSON data from URL
            JSONObject json = null;
            nomedeputato = getIntent().getExtras().getString("id");

            String query = "select distinct * where { OPTIONAL {?atto ocd:primo_firmatario ?deputato. ?atto a ocd:atto.} OPTIONAL {?atto ocd:altro_firmatario ?deputato . ?atto a ocd:atto.} ?atto dc:title ?nomeAtto}";

            String rquery = query.replace("?deputato", "<" + nomedeputato + ">");

            String urlstring = null;
            try {
                urlstring = URLEncoder.encode(rquery, "utf-8");
                String eee = url_pre + rquery + url_pos;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            json = jParser.getJSONFromUrl(url_pre + urlstring + url_pos);


            try {


                JSONObject result = json.getJSONObject("results");

                JSONArray bindings = result.getJSONArray("bindings");

                for (int i = 0; i < bindings.length(); i++) {

                    try {

                        JSONObject atto = bindings.getJSONObject(i).getJSONObject("nomeAtto");


                        String attovalue = atto.getString("value");
                        HashMap<String, String> map = new HashMap<String, String>();

                        // Add child node to HashMap key & value
                        map.put("attoValue", attovalue);

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